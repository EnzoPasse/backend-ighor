import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinciaModule } from './provincia/provincia.module';
import { LocalidadService } from './localidad/localidad.service';
import { LocalidadModule } from './localidad/localidad.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ProvinciaModule, LocalidadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
