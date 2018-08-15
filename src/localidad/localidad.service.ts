import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LocalidadEntity } from './localidad-entity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProvinciaEntity } from '../provincia/provincia-entity.entity';
import { LocalidadesProvinciaRO } from './localidadesProvinciaRO.interface';
import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { LocaliadRO } from './localidadRO.interface';

@Injectable()
export class LocalidadService {

  constructor(
    @InjectRepository(LocalidadEntity)
    private readonly localidadRepositoty: Repository<LocalidadEntity>,
    @InjectRepository(ProvinciaEntity)
    private readonly provinciaRepositoty: Repository<ProvinciaEntity>) {}

  async findAll(): Promise<LocalidadEntity[]> {
    return await this.localidadRepositoty.find();
  }

  async findAllByProvincia(id: number): Promise<LocalidadesProvinciaRO> {

    const provinciaResult = await this.provinciaRepositoty.findOne(id);
    if (!provinciaResult) {
      throw new HttpException(
        { message: 'La provincia no existe' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const localidadesResult = await this.localidadRepositoty.find({IdProvincia: id});

    const returnLocalidades = {
      provincia: provinciaResult,
      localidades: localidadesResult,
    } as LocalidadesProvinciaRO;

    return returnLocalidades;
  }

  async create(dto: CreateLocalidadDto): Promise<LocaliadRO> {

    const localidad = await this.localidadRepositoty.findOne({nombre: `${dto.nombre}` });

    if (localidad){
      throw new HttpException({message: 'La Localidad ya Existe'} , HttpStatus.BAD_REQUEST );
    }

    const newLocalidad = new LocalidadEntity();
    newLocalidad.IdProvincia = dto.IdProvincia;
    newLocalidad.nombre = dto.nombre;
    newLocalidad.CodigoPostal = dto.CodigoPostal;

    const saveLocalidad = await this.localidadRepositoty.save(newLocalidad);

    return this.builLocalidadRO(saveLocalidad);
  }

  private builLocalidadRO(localidad: LocalidadEntity){
   const returnLocalidad = {
     IdLocalidad: localidad.IdLocalidad,
     nombre: localidad.nombre,
     CodigoPostal: localidad.CodigoPostal,
    } as LocaliadRO;

   return returnLocalidad;
  }
}
