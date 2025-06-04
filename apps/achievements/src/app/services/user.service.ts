import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { AchievementCacheService } from './achievement-cache.service';
import { BadgeService } from './badge.service';
import { UserBadgesService } from './user-badges.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly achievementCacheService: AchievementCacheService,
    private readonly userBadgesService: UserBadgesService,
    private readonly badgeService: BadgeService,
  ) {}

  async upsert(users: { twitter: string; wallet: string }[]): Promise<void> {
    const usersToInsert = users.map((user) => {
      const newUser = new UserEntity();
      newUser.twitter = user.twitter;
      newUser.wallet = user.wallet;
      return newUser;
    });

    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(usersToInsert)
      .orIgnore()
      .execute();
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findManyByTwitter(twitterHandles: string[]): Promise<UserEntity[]> {
    if (twitterHandles.length === 0) {
      return [];
    }

    return this.userRepository.find({
      where: { twitter: In(twitterHandles) },
    });
  }

  async findManyByWallet(wallets: string[]): Promise<UserEntity[]> {
    if (wallets.length === 0) {
      return [];
    }

    return this.userRepository.find({
      where: { wallet: In(wallets) },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.twitter = createUserDto.twitter;
    user.wallet = createUserDto.wallet;

    return this.userRepository.save(user);
  }
}
