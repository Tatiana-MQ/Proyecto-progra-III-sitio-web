import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdateProductoDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(80, { message: 'El nombre no puede pasar de 80 caracteres' })
  nombre?: string;

  @IsOptional()
  @IsString({ message: 'La línea debe ser texto' })
  @IsNotEmpty({ message: 'La línea es obligatoria' })
  @MaxLength(60, { message: 'La línea no puede pasar de 60 caracteres' })
  linea?: string;

  @IsOptional()
  @IsIn(['pulseras', 'collares', 'llaveros'], {
    message: 'La categoría debe ser: pulseras, collares o llaveros',
  })
  categoria?: string;

  @IsOptional()
  @IsIn(['Semillas', 'Madera', 'Macramé', 'Cuencas'], {
    message: 'El material debe ser: Semillas, Madera, Macramé o Cuencas',
  })
  material?: string;

  @IsOptional()
  @IsInt({ message: 'El precio debe ser un número entero (colones)' })
  @IsPositive({ message: 'El precio debe ser mayor a 0' })
  precio?: number;

  @IsOptional()
  @IsString({ message: 'La foto debe ser texto' })
  @Matches(/^[a-z0-9-]+\.(jpg|jpeg|png|webp)$/, {
    message:
      'La foto debe ser un nombre de archivo como "pulsera-roja.jpg" (minúsculas, números o guiones; .jpg, .jpeg, .png o .webp)',
  })
  foto?: string;

  @IsOptional()
  @IsBoolean({ message: 'disponible debe ser true o false' })
  disponible?: boolean;
}
