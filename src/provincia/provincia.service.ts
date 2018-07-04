import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Provincias } from './provincias.entity';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { ProvinciaRO } from './provincia.interface';
import { validate } from 'class-validator';
import { async } from 'rxjs/internal/scheduler/async';

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
    // const { nombre } = dto;
    /* const qb = await getRepository(Provincias)
      .createQueryBuilder('provincia')
      .where('provincia.nombre = :nombre', { nombre });

    const provincia = await qb.getOne(); */

    const errordto = await validate(dto);
    Logger.log('sera' + errordto.toString());

    if (errordto.length > 0) {
      const errors = { error: 'Nombre no válido' };
      throw new HttpException(
        { message: 'Fallo al ingresar los datos', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const provincia = await this.provinciaRepository.findOne({
      nombre: `${dto.nombre}`,
    });

    if (provincia) {
      const errors = { error: 'La provincia ya existe' };
      throw new HttpException(
        { message: 'Fallo al ingresar los datos', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newProvincia = new Provincias();
    newProvincia.nombre = dto.nombre;

    Logger.log(JSON.stringify(dto));
    Logger.log(JSON.stringify(newProvincia));

    const saveProvincia = await this.provinciaRepository.save(newProvincia);

    return this.buildProvinciaRO(saveProvincia);
  }

  private buildProvinciaRO(provincia: Provincias) {

    // tslint:disable-next-line:prefer-const
    let returnProv = {
      IdProvincia: provincia.IdProvincia,
      nombre: provincia.nombre,
    } as ProvinciaRO;

    return returnProv;
  }
}
