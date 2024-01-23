import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';
import { ProductsController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from '../../database/prisma/prisma.service';
import { multerConfig } from './multer.config';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => multerConfig,
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductService, PrismaService],
})
export class ProductsModule {}
