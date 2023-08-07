import { Column, PrimaryGeneratedColumn } from "typeorm";

export class AbstractEntity<T> {
  // @PrimaryGeneratedColumn()
  @Column('int', { nullable: false, primary: true })
  id: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}