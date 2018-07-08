import { IsAlpha, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateLocalidadDto {

  @ApiModelProperty()
  @IsInt({ message: 'Valor del $property inválido!' })
  readonly IdProvincia: number;

  @ApiModelProperty()
  @IsInt({ message: 'Valor del $property inválido!' })
  readonly CodigoPostal: number;

  @ApiModelProperty()
  @IsAlpha({ message: 'Valor del $property inválido!' })
  readonly nombre: string;
}
