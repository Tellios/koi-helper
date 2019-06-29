import { Entity, Column } from "typeorm";
import { Id } from "app/storage";
import { AppBaseEntity } from "./AppBaseEntity";

@Entity()
export class PhotoEntity extends AppBaseEntity {
  @Column("uuid")
  reference!: Id;

  @Column("blob")
  data: Blob = new Blob();
}
