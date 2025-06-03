import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

// TODO: Remove unused methods
@Injectable()
export class UserService {
  @InjectRepository(User) private readonly userRepository: Repository<User>;

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async upsert(users: User[]): Promise<void> {
    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(users)
      .orIgnore()
      .execute();
  }

  async findUserByUserId(userId: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async findUserByWallet(wallet: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { wallet } });
  }

  async findUserByTwitter(twitter: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { twitter } });
  }
}
