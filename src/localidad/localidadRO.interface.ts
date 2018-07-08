import { ProvinciaRO } from 'provincia/provincia.interface';
import { LocalidadEntity } from './localidad-entity.entity';

export interface LocalidadRO {
 provincia: ProvinciaRO;
 localidades: LocalidadEntity[];

}