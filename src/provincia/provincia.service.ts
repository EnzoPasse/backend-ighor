import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { ProvinciaRO } from './provincia.interface';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { ProvinciaEntity } from './provincia-entity.entity';

@Injectable()
export class ProvinciaService {
  constructor(
    @InjectRepository(ProvinciaEntity)
    private readonly provinciaRepository: Repository<ProvinciaEntity>,
  ) {}

  async findAll(): Promise<ProvinciaEntity[]> {
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
      throw new HttpException(
        { message: 'La provicia ya existe' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newProvincia = new ProvinciaEntity();
    newProvincia.nombre = dto.nombre;

    const saveProvincia = await this.provinciaRepository.save(newProvincia);

    return this.buildProvinciaRO(saveProvincia);
  }

  private buildProvinciaRO(provincia: ProvinciaEntity) {
    // tslint:disable-next-line:prefer-const
    let returnProv = {
      IdProvincia: provincia.IdProvincia,
      nombre: provincia.nombre,
    } as ProvinciaRO;

    return returnProv;
  }

  async update(id: number, dto: UpdateProvinciaDto): Promise<ProvinciaEntity> {
    // el objeto que devuelve el repositorio es de tipo Entity

    const toUpdate = await this.provinciaRepository.findOne(id);
    if (!toUpdate) {
      throw new HttpException(
        { message: 'La provincia no existe' },
        HttpStatus.BAD_REQUEST,
      );
    }
    // delete toUpdate.visible;
    // delete objeto.propiedad ha borrar que sobre
    // Luego copia profunda del dto al objeto encontrado
    const updated = Object.assign(toUpdate, dto);

    // devuelvo la entity del objeto guardado
    return this.provinciaRepository.save(updated);
  }

  async delete(id: number) {
    const todelete = await this.provinciaRepository.findOne(id);
    if (!todelete) {
      throw new HttpException(
        { message: 'La provincia no existe' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.provinciaRepository.delete(id);
  }
}
