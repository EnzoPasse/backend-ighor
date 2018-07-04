
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('provincias')
export class Provincias {

@PrimaryGeneratedColumn() IdProvincia: number;

@Column() nombre: string;

@Column({nullable: true}) visible: number;

}