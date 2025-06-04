import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import * as fs from 'fs/promises';
import * as path from 'path';
import {
  DATA_ETHEREUM_WALLETS_PATH,
  DATA_TWITTER_USERNAMES_PATH,
} from '../constants';

@Injectable()
export class AchievementCacheService implements OnModuleInit {
  private readonly logger = new Logger(AchievementCacheService.name);

  private twitters = new Set<string>();
  private wallets = new Set<string>();
  private isInitialized = false;

  async onModuleInit() {
    await this.loadAchievementData();
  }

  private async loadAchievementData(): Promise<void> {
    try {
      this.logger.debug('Loading achievement data from CSV files...');

      await Promise.all([
        this.loadCsvData(DATA_TWITTER_USERNAMES_PATH, this.twitters),
        this.loadCsvData(DATA_ETHEREUM_WALLETS_PATH, this.wallets),
      ]);

      this.isInitialized = true;
      this.logger.debug('Achievement data loaded successfully');
    } catch (error) {
      this.logger.error('Failed to load achievement data:', error);
      throw error;
    }
  }

  private async loadCsvData(
    filePath: string,
    targetSet: Set<string>,
  ): Promise<void> {
    const resolvedPath = path.resolve(filePath);

    try {
      await fs.access(resolvedPath);
    } catch {
      this.logger.warn(`Achievement file not found: ${resolvedPath}`);
      return;
    }

    const csvContent = await fs.readFile(resolvedPath, 'utf-8');
    const records: Record<string, string>[] = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    const fieldName = Object.keys(records[0])[0];

    for (const record of records) {
      if (record[fieldName]) {
        targetSet.add(record[fieldName].toLowerCase());
      }
    }
  }

  isTwitterEligible(twitterHandle: string): boolean {
    if (!this.isInitialized) {
      this.logger.warn('Achievement cache not initialized yet');
      return false;
    }
    return this.twitters.has(twitterHandle.toLowerCase());
  }

  isWalletEligible(walletAddress: string): boolean {
    if (!this.isInitialized) {
      this.logger.warn('Achievement cache not initialized yet');
      return false;
    }
    return this.wallets.has(walletAddress.toLowerCase());
  }
}
