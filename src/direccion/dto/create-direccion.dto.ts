import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class CreateDireccionDto {
  @IsString()
  @IsNotEmpty()
  direccion_completa: string;

  @IsString()
  @IsOptional()
  referencia?: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitud: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitud: number;
}
