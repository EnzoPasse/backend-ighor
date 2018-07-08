
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('provincias')
export class ProvinciaEntity {

@PrimaryGeneratedColumn() IdProvincia: number;

@Column() nombre: string;

@Column({ default: 1 }) visible: number;

}