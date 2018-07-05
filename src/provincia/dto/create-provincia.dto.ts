
import { IsNotEmpty, IsString, IsAlpha } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateProvinciaDto{

    @ApiModelProperty()
    @IsAlpha({message: 'Valor del $property inválido!'})
    readonly nombre: string;
}