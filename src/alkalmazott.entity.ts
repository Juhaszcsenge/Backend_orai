import { Exclude } from 'class-transformer';
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
}
