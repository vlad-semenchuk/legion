import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('badges')
export class BadgeEntity {
  @PrimaryColumn({ length: 100 })
  id: string;

  @Column({ length: 50 })
  type: string;

  @Column({ length: 255 })
  icon: string;

  @Column({ length: 100 })
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  lore: string;

  @CreateDateColumn()
  created_at: Date;
}
