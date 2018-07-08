import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LocalidadEntity } from './localidad-entity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalidadRO } from './localidadRO.interface';
import { ProvinciaEntity } from '../provincia/provincia-entity.entity';

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

  async findAllByProvincia(id: number): Promise<LocalidadRO> {

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
    } as LocalidadRO;

    return returnLocalidades;
  }
}
