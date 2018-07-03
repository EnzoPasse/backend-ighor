import { Controller, Get } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { Provincias } from './provincias.entity';

@Controller('provincia')
export class ProvinciaController {
  constructor(private readonly provinciaService: ProvinciaService) {}

  @Get()
  findAll(): Promise<Provincias[]> {
    return this.provinciaService.findAll();
  }
}
