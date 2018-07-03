import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinciaModule } from './provincia/provincia.module';
import { Entity } from 'typeorm';

@Module({
  imports: [ TypeOrmModule.forRoot(), ProvinciaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
