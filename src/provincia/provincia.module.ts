
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinciaController } from './provincia.controller';
import { ProvinciaService } from './provincia.service';
import { ProvinciaEntity } from './provincia-entity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProvinciaEntity])],
  providers: [ProvinciaService],
  controllers: [ProvinciaController],
  exports: [ProvinciaService],
})
export class ProvinciaModule {}
