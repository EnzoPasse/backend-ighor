import { Module } from '@nestjs/common';
import { ProvinciaController } from './provincia.controller';
import { ProvinciaService } from './provincia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provincias } from './provincias.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provincias])],
  controllers: [ProvinciaController] ,
  providers: [ ProvinciaService ],
})
export class ProvinciaModule {}
