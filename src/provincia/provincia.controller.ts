import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseFilters,
  Put,
  Param,
  Logger,
  Delete,
} from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiImplicitParam } from '@nestjs/swagger';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { ProvinciaEntity } from './provincia-entity.entity';

@ApiUseTags('Provincias')
@UseFilters(new HttpExceptionFilter())
@Controller()
export class ProvinciaController {
  constructor(private readonly provinciaService: ProvinciaService) {}

  @ApiOperation({ title: 'retorna todas las provincias' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('provincia')
  async findAll(): Promise<ProvinciaEntity[]> {
    return await this.provinciaService.findAll();
  }

  @ApiOperation({ title: 'Crea una  provincia' })
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  @UsePipes(new ValidationPipe())
  @Post('provincia')
  async create(@Body() provinciaData: CreateProvinciaDto) {
    return await this.provinciaService.create(provinciaData);
  }

  @ApiOperation({ title: 'Actualiza una  provincia' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  @ApiImplicitParam ({name: 'id' , description: 'El id de la provincia a buscar'})
  @UsePipes(new ValidationPipe())
  @Put('provincia/:id')
  async update(@Param('id') id: number, @Body() updateDto: UpdateProvinciaDto) {
    return await this.provinciaService.update(id, updateDto);
  }

  @ApiOperation({ title: 'Borra una  provincia' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  @ApiImplicitParam ({name: 'id' , description: 'El id de la provincia a borrar'})

  @Delete('provincia/:id')
  async delete(@Param('id') id: number) {
    return await this.provinciaService.delete(id);
  }
}
