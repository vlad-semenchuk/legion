import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Badge } from '../entities/badge.entity';

@Injectable()
export class BadgeService {
  @InjectRepository(Badge) private readonly repository: Repository<Badge>;

  async findById(id: string): Promise<Badge | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByTitle(title: string): Promise<Badge | null> {
    return this.repository.findOne({ where: { title } });
  }

  async findByIdOrTitle(idOrTitle: string): Promise<Badge | null> {
    const badge = await this.findById(idOrTitle);

    if (badge) {
      return badge;
    }

    return this.findByTitle(idOrTitle);
  }
}
