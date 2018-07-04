import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Provincias } from './provincias.entity';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { ProvinciaRO } from './provincia.interface';
import { validate } from 'class-validator';

@Injectable()
export class ProvinciaService {
  constructor(
    @InjectRepository(Provincias)
    private readonly provinciaRepository: Repository<Provincias>,
  ) {}

  async findAll(): Promise<Provincias[]> {
    return await this.provinciaRepository.find();
  }

  async create(dto: CreateProvinciaDto): Promise<ProvinciaRO> {
    const { nombre } = dto;
    /* const qb = await getRepository(Provincias)
      .createQueryBuilder('provincia')
      .where('provincia.nombre = :nombre', { nombre });

    const provincia = await qb.getOne(); */

    const provincia = await this.provinciaRepository.findOne({nombre: `${dto.nombre}`});

    if (provincia) {
      const error = { nombre: 'La provincia ya existe' };
      throw new HttpException(
        { message: 'Fallo al ingresar los datos', error },
        HttpStatus.BAD_REQUEST,
      );
    }

    // tslint:disable-next-line:prefer-const
    let newProvincia = new Provincias();
    newProvincia.nombre = nombre;

    const errors = await validate(newProvincia);

    if (errors.length > 0) {
      const _errors = { nombre: 'Nombre no valido' };
      throw new HttpException(
        { message: 'Fallo al ingresar los datos', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const saveProvincia = await this.provinciaRepository.save(newProvincia);

      return this.buildProvinciaRO(saveProvincia);
    }
  }

  private buildProvinciaRO(provincia: Provincias) {
    const ProvinciaRO = {
      IdProvincia: provincia.IdProvincia,
      nombre: provincia.nombre,
    };

    // tslint:disable-next-line:prefer-const
    let returnProv = {
      IdProvincia: provincia.IdProvincia,
      nombre: provincia.nombre,
    } as ProvinciaRO;

    return returnProv;
  }
}
