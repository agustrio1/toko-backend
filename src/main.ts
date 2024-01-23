import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './modules/products/product.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  await app.listen(5000);
}
bootstrap();
