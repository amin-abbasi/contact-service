import { Entity, Column, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'Contact' })
@Unique(['email'])
export class Contact extends BaseEntity {
  constructor(payload: Contact) {
    super();
    Object.assign(this, payload);
  }

  @Column({ type: 'varchar', length: 300 })
  firstName: string;

  @Column({ type: 'varchar', length: 300 })
  lastName: string;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', unique: true })
  phone: number;

  @Column({ type: 'smallint', nullable: true })
  age: number;
}
