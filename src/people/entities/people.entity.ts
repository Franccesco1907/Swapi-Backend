import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'people' })
export class People extends AbstractEntity<People> {

  @Column('text', { nullable: false })
  name: string;
  @Column('text', { nullable: false })
  birth_year: string;
  @Column('text', { nullable: false })
  eye_color: string;
  @Column('text', { nullable: false })
  gender: string;
  @Column('text', { nullable: false })
  hair_color: string;
  @Column('text', { nullable: false })
  height;
  @Column('text', { nullable: false })
  homeworld;
  @Column('text', { nullable: false })
  mass;
  @Column('text', { nullable: false })
  skin_color;
  @Column('text', { nullable: false })
  created;
  @Column('text', { nullable: false })
  edited;
  @Column('text', { nullable: false })
  url;
}
