import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    // *************** busco si existe alguno con el mismo nombre*************
    /* const { nombre } = dto;
      const qb = await getRepository(Provincias)
      .createQueryBuilder('provincia')
      .where('provincia.nombre = :nombre', { nombre });

     const provincia = await qb.getOne();

     // *******uso el validate() para validar el dato DTO segun su declaracion**********
     const errordto = await validate(dto);

    if (errordto.length > 0) {
      const errors = { error: 'Nombre no válido' };
      throw new HttpException(
        { message: 'Fallo al ingresar los datos', errors },
        HttpStatus.BAD_REQUEST,
      );
    } */
    // NOTAAAAAASS: - es mejor esta manera para buscar uno con el mismo nombre
    //              - dejo de usar el validate... mejor uso el ValidatePipe() en el controller

    const provincia = await this.provinciaRepository.findOne({
      nombre: `${dto.nombre}`,
    });

    if (provincia) {
      throw new HttpException({ message: 'La provicia ya existe' }, HttpStatus.BAD_REQUEST);
    }

    const newProvincia = new Provincias();
    newProvincia.nombre = dto.nombre;

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
