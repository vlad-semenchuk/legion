import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadgeEntity } from '../entities/badge.entity';

@Injectable()
export class BadgeService {
  @InjectRepository(BadgeEntity)
  private readonly repository: Repository<BadgeEntity>;

  async findById(id: string): Promise<BadgeEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByTitle(title: string): Promise<BadgeEntity | null> {
    return this.repository.findOne({ where: { title } });
  }

  async findByIdOrTitle(idOrTitle: string): Promise<BadgeEntity | null> {
    const badge = await this.findById(idOrTitle);

    if (badge) {
      return badge;
    }

    return this.findByTitle(idOrTitle);
  }

  async findAll(): Promise<Record<string, BadgeEntity[]>> {
    const badges = await this.repository.find({
      order: {
        type: 'ASC',
        created_at: 'ASC',
      },
    });

    const groupedBadges: Record<string, BadgeEntity[]> = {};

    badges.forEach((badge) => {
      if (!groupedBadges[badge.type]) {
        groupedBadges[badge.type] = [];
      }
      groupedBadges[badge.type].push(badge);
    });

    return groupedBadges;
  }
}
