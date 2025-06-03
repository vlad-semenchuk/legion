import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User) private readonly userRepository: Repository<User>;

  async upsert(users: { twitter: string; wallet: string }[]): Promise<void> {
    const usersToInsert = users.map((user) => {
      const newUser = new User();
      newUser.twitter = user.twitter;
      newUser.wallet = user.wallet;
      return newUser;
    });

    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(usersToInsert)
      .orIgnore()
      .execute();
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findManyByTwitter(twitterHandles: string[]): Promise<User[]> {
    if (twitterHandles.length === 0) {
      return [];
    }

    return this.userRepository.find({
      where: { twitter: In(twitterHandles) },
    });
  }

  async findManyByWallet(wallets: string[]): Promise<User[]> {
    if (wallets.length === 0) {
      return [];
    }

    return this.userRepository.find({
      where: { wallet: In(wallets) },
    });
  }
}
