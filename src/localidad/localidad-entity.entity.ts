import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// tslint:disable-next-line:quotemark
@Entity("localidades")
export class LocalidadEntity {
  @PrimaryGeneratedColumn() IdLocalidad: number;

  @Column() IdProvincia: number;

  @Column() CodigoPostal: number;

  @Column() nombre: string;

  @Column({ default: 1 }) visible: number;
}
