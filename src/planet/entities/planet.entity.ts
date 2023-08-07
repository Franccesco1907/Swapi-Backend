import { Column, Entity } from "typeorm";

@Entity({ name: 'planet' })
export class Planet {
  @Column('text', { nullable: false })
  climate
  @Column('text', { nullable: false })
  diameter
  @Column('text', { nullable: false })
  gravity
  @Column('text', { nullable: false })
  name
  @Column('text', { nullable: false })
  population
  @Column('text', { nullable: false })
  residents
  @Column('text', { nullable: false })
  terrain
  @Column('text', { nullable: false })
  url
}
