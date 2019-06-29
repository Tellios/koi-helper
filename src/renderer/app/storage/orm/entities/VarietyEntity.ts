import { Entity, Column } from "typeorm";
import { AppBaseEntity } from "./AppBaseEntity";

@Entity()
export class VarietyEntity extends AppBaseEntity {
  @Column("text")
  name: string = "";

  @Column("text")
  description: string = "";
}
