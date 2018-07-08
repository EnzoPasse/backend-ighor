import { IsNotEmpty, IsString, IsAlpha, IsNumber, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateProvinciaDto {

  @ApiModelProperty()
  @IsInt({ message: 'Valor del $property inválido!' })
  readonly IdProvincia: number;

  @ApiModelProperty()
  @IsAlpha({ message: 'Valor del $property inválido!' })
  readonly nombre: string;
}
