import { ProvinciaRO } from 'provincia/provincia.interface';
import { LocalidadEntity } from './localidad-entity.entity';

export interface LocalidadesProvinciaRO {
 provincia: ProvinciaRO;
 localidades: LocalidadEntity[];

}