import { IsNotEmpty, IsString, IsNumber, Min, IsPositive } from 'class-validator';

export class BonoDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly monto: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  readonly calificacion: number;

  @IsString()
  @IsNotEmpty()
  readonly palabraClave: string;
}