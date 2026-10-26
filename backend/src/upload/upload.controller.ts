import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AdminGuard } from '../auth/admin.guard';

// Extensiones de imagen que se aceptan
const EXTENSIONES = ['.jpg', '.jpeg', '.png', '.webp'];

// Cómo se guarda la foto: en la carpeta uploads, con un nombre único
// (ej. producto-1761400000000.jpg) para que nunca se repita
const almacenamiento = diskStorage({
  destination: './uploads',
  filename: function (peticion, archivo, listo) {
    const extension = extname(archivo.originalname).toLowerCase();
    listo(null, 'producto-' + Date.now() + extension);
  },
});

// Solo deja pasar imágenes
function soloImagenes(peticion: any, archivo: any, listo: any) {
  const extension = extname(archivo.originalname).toLowerCase();
  if (EXTENSIONES.includes(extension)) {
    listo(null, true);
  } else {
    listo(new BadRequestException('Solo se permiten imágenes JPG, PNG o WEBP'), false);
  }
}

@Controller('upload')
export class UploadController {
  // =====================================
  // POST /upload - SUBIR FOTO (solo administrador)
  // =====================================

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: almacenamiento,
      fileFilter: soloImagenes,
      limits: { fileSize: 5 * 1024 * 1024 }, // máximo 5 MB
    }),
  )
  subirFoto(@UploadedFile() archivo: Express.Multer.File) {
    if (!archivo) {
      throw new BadRequestException('Debe enviar una imagen en el campo "foto"');
    }

    // Se devuelve el nombre para guardarlo en el producto
    return { foto: archivo.filename };
  }
}
