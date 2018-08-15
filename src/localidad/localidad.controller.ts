import {
  Controller,
  Inject,
  UseFilters,
  Get,
  Param,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LocalidadService } from './localidad.service';
import {
  ApiUseTags,
  ApiOperation,
  ApiResponse,
  ApiImplicitParam,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from 'common/filters/http-exception.filter';
import { LocalidadEntity } from './localidad-entity.entity';
import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { LocalidadesProvinciaRO } from './localidadesProvinciaRO.interface';

@ApiUseTags('Localidades')
@UseFilters(new HttpExceptionFilter())
@Controller()
export class LocalidadController {
  constructor(private readonly localidadService: LocalidadService) {}

  @ApiOperation({ title: 'Retorna todas las localidades' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('localidad')
  async findAll(): Promise<LocalidadEntity[]> {
    return await this.localidadService.findAll();
  }

  @ApiOperation({ title: 'Retorna todas las localidades de una provincia' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiImplicitParam({ name: 'id', description: 'El id de la provincia a buscar'})
  @Get('localidad/provincia/:id')
  async findAllByProvincia(@Param('id') id: number): Promise<LocalidadesProvinciaRO> {
    return await this.localidadService.findAllByProvincia(id);
  }

  @ApiOperation({ title: 'Crea una Localidad' })
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  @UsePipes(new ValidationPipe())
  @Post('localidad')
  async create(@Body() localidadData: CreateLocalidadDto) {
    return await this.localidadService.create(localidadData);
  }
}
