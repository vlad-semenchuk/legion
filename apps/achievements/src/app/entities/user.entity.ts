import { CreateDateColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Entity } from 'typeorm';

import { Column } from 'typeorm';

@Entity('users')
@Unique(['twitter', 'wallet'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15 })
  twitter: string;

  @Column({ length: 42 })
  wallet: string;

  @CreateDateColumn()
  created_at: Date;
}
