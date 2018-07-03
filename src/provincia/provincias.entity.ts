import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('provincias')
export class Provincias {
  @PrimaryGeneratedColumn()
  IdProvincia: number;

  @Column({type: 'varchar', nullable: true})
  nomnre: string;

  @Column()
  visible: number;
}