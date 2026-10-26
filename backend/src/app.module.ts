import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [ProductosModule, AuthModule, UploadModule],
})
export class AppModule {}
