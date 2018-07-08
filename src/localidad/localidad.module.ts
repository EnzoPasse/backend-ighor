import { Module } from '@nestjs/common';
import { LocalidadController } from './localidad.controller';
import { LocalidadService } from './localidad.service';
import { LocalidadEntity } from './localidad-entity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinciaService } from 'provincia/provincia.service';
import { ProvinciaEntity } from '../provincia/provincia-entity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocalidadEntity, ProvinciaEntity])],
  providers: [LocalidadService],
  controllers: [LocalidadController],
})
export class LocalidadModule {}
