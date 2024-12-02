import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class UsuarioDto {
  @IsNotEmpty()
  @IsInt()
  readonly cedula: number;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly grupoInvestigacion: string;

  @IsNotEmpty()
  @IsInt()
  readonly numeroExtension: number;

  @IsNotEmpty()
  @IsString()
  readonly rol: string;

  readonly jefeId?: string;
}