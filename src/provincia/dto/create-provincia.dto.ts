
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateProvinciaDto{

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;
}