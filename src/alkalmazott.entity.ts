import { Exclude } from 'class-transformer';
import { Min } from 'class-validator';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Alkalmazott {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kezdoDatum: Date;

  @Exclude()
  @Column('int')
  haviBer: number;

  @Column()
  hivatalosEmail: string;

  @Column()
  Teljesnev: string;

  @Column()
  jelszo: string;

  @Column()
  @Min(0)
  beosztottak: number;
}
