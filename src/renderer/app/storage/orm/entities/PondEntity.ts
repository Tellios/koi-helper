import { Entity, Column, OneToMany } from "typeorm";
import { FishEntity } from "./FishEntity";
import { AppBaseEntity } from "./AppBaseEntity";

@Entity()
export class PondEntity extends AppBaseEntity {
  @Column("text")
  name: string = "";

  @Column("double")
  length: number = 0;

  @Column("double")
  width: number = 0;

  @Column("double")
  depth: number = 0;

  @Column("double")
  volume: number = 0;

  @Column("boolean")
  archived: boolean = false;

  @OneToMany(() => FishEntity, fish => fish.pond)
  fishes: FishEntity[] = [];
}
