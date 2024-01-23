import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductDTO, CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
      return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(@UploadedFile() image, @Body() createProductDTO: CreateProductDTO) {
    return this.productService.createProduct(image, createProductDTO);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(@Param('id') id: string, @UploadedFile() image, @Body() updateProductDTO: UpdateProductDTO) {
    return this.productService.updateProduct(id, image, updateProductDTO);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}