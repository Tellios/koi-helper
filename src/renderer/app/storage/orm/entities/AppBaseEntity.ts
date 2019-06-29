import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Id } from "app/storage";

export abstract class AppBaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: Id;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}
