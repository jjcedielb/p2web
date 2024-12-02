import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class ClaseDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly codigo: string;

    @IsInt()
    @IsNotEmpty()
    readonly numeroCreditos: number;
}