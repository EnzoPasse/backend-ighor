import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provincias } from './provincias.entity';

@Injectable()
export class ProvinciaService {
  constructor(
    @InjectRepository(Provincias)
    private readonly photoRepository: Repository<Provincias>,
  ) {}

  async findAll(): Promise<Provincias[]> {
    return await this.photoRepository.find();
  }
}