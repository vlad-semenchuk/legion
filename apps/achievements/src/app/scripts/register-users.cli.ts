import 'dotenv/config';

// Disable migrations for CLI scripts
process.env.DATABASE_RUN_MIGRATIONS = 'false';

import { NestFactory } from '@nestjs/core';
import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from '../app.module';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

interface CSVUserRow {
  id: string;
  twitter: string;
  wallet: string;
}

async function readCSVFile(filePath: string): Promise<CSVUserRow[]> {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`CSV file not found: ${fullPath}`);
  }

  const csvContent = fs.readFileSync(fullPath, 'utf-8');
  const records: CSVUserRow[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return records;
}

async function registerUsersFromCSV() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UserService);

  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: register-users.cli.ts <csvFilePath>');
    process.exit(1);
  }

  const [csvFilePath] = args;

  try {
    console.log(`Reading CSV file: ${csvFilePath}`);
    const records = await readCSVFile(csvFilePath);
    console.log(`Found ${records.length} user records`);

    const users = records.map((record) => {
      const user = new User();
      user.twitter = record.twitter;
      user.wallet = record.wallet;
      return user;
    });

    await usersService.upsert(users);

    console.log(`✅ Successfully processed ${users.length} users`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await app.close();
  }
}

registerUsersFromCSV();
