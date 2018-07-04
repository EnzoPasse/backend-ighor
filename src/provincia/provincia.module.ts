
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinciaController } from './provincia.controller';
import { ProvinciaService } from './provincia.service';
import { Provincias } from './provincias.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provincias])],
  providers: [ProvinciaService],
  controllers: [ProvinciaController],
})
export class ProvinciaModule {}
