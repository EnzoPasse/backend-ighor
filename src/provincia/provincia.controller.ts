import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { Provincias } from './provincias.entity';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProvinciaDto } from './dto/create-provincia.dto';

@ApiUseTags('provinicias')
@Controller()
export class ProvinciaController {
  constructor(private readonly provinciaService: ProvinciaService) {}

  @ApiOperation({ title: 'retorna todas las provincias' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })

  @Get('provincias')
  findAll(): Promise<Provincias []> {
    return this.provinciaService.findAll();
  }

  @ApiOperation({ title: 'Crear una  provincias' })
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })

  @UsePipes(new ValidationPipe())
  @Post('provincia')
  async create(@Body () provinciaData: CreateProvinciaDto) {
    return await this.provinciaService.create(provinciaData);
  }
}
