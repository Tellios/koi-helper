import { UpdateDateColumn, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import type { Id } from '../../Id';

export abstract class AppBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: Id;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}
