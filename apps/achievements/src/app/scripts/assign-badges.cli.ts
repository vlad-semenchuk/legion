import 'dotenv/config';

// Disable migrations for CLI scripts
process.env.DATABASE_RUN_MIGRATIONS = 'false';

import { NestFactory } from '@nestjs/core';
import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from '../app.module';
import { BadgeService } from '../services/badge.service';
import { UserBadgesService } from '../services/user-badges.service';
import { UserService } from '../services/user.service';

interface CSVTwitterRow {
  twitter: string;
}

interface CSVWalletRow {
  wallet: string;
}

type CSVRow = CSVTwitterRow | CSVWalletRow;

function isTwitterRow(row: CSVRow): row is CSVTwitterRow {
  return 'twitter' in row;
}

function isWalletRow(row: CSVRow): row is CSVWalletRow {
  return 'wallet' in row;
}

async function readCSVFile(filePath: string): Promise<CSVRow[]> {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`CSV file not found: ${fullPath}`);
  }

  const csvContent = fs.readFileSync(fullPath, 'utf-8');
  const records: CSVRow[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return records;
}

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

async function assignBadgesToUsers() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);
  const badgeService = app.get(BadgeService);
  const userBadgesService = app.get(UserBadgesService);

  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: assign-badges.cli.ts <csvFilePath> <badgeIdOrName>');
    process.exit(1);
  }

  const [csvFilePath, badgeIdOrName] = args;

  try {
    console.log(`Reading CSV file: ${csvFilePath}`);
    const records = await readCSVFile(csvFilePath);
    console.log(`Found ${records.length} records`);

    const badge = await badgeService.findByIdOrTitle(badgeIdOrName);

    if (!badge) {
      console.error(`❌ Badge not found: ${badgeIdOrName}`);
      process.exit(1);
    }

    console.log(`Using badge: "${badge.title}" (${badge.id})`);

    const isTwitterCSV = isTwitterRow(records[0]);
    const isWalletCSV = isWalletRow(records[0]);

    if (!isTwitterCSV && !isWalletCSV) {
      console.error(
        '❌ Invalid CSV format. Expected "twitter" or "wallet" column.',
      );
      process.exit(1);
    }

    console.log(`Detected CSV type: ${isTwitterCSV ? 'Twitter' : 'Wallet'}`);

    const values = isTwitterCSV
      ? (records as CSVTwitterRow[]).map((r) => r.twitter)
      : (records as CSVWalletRow[]).map((r) => r.wallet);

    console.log('Finding users in batches...');

    const BATCH_SIZE = 100;
    const chunks = chunkArray(values, BATCH_SIZE);
    const assignments: { userId: number; badgeId: string }[] = [];
    let totalFound = 0;

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      let users;
      if (isTwitterCSV) {
        users = await userService.findManyByTwitter(chunk);
      } else {
        users = await userService.findManyByWallet(chunk);
      }

      totalFound += users.length;

      const batchAssignments = users.map((user) => ({
        userId: user.id,
        badgeId: badge.id,
      }));

      assignments.push(...batchAssignments);
    }

    console.log(`Total users found: ${totalFound}`);

    if (assignments.length > 0) {
      console.log('Assigning badges...');

      await userBadgesService.assignMany(assignments);
      console.log(
        `✅ Successfully processed badge assignment for ${assignments.length} users`,
      );
    } else {
      console.log('ℹ️  No new badge assignments needed');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await app.close();
  }
}

assignBadgesToUsers();
