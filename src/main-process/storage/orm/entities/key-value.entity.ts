import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from './AppBaseEntity';

@Entity()
export class KeyValueEntity extends AppBaseEntity {
  @Column('text')
  value: string = '';
}
