import { Entity, Column } from "typeorm";
import { AppBaseEntity } from "./AppBaseEntity";

@Entity()
export class DiseaseEntity extends AppBaseEntity {
  @Column("text")
  name: string = "";

  @Column("text")
  description: string = "";

  @Column("text")
  medication: string = "";
}
