import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import {
  ProductDTO,
  CreateProductDTO,
  UpdateProductDTO,
} from './dto/product.dto';
import { multerConfig } from './multer.config';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts() {
    return this.prisma.product.findMany();
  }

  async getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async createProduct(image: any, createProductDTO: CreateProductDTO) {
    const { name, category, price, description } = createProductDTO;
    const createdProduct = await this.prisma.product.create({
      data: {
        name,
        category,
        price,
        description,
        image: image.filename,
      },
    });
    return createdProduct;
  }

  async updateProduct(
    id: string,
    image: any,
    updateProductDTO: UpdateProductDTO,
  ) {
    const { name, category, price, description } = updateProductDTO;
    // Periksa apakah ada gambar yang diunggah
    if (image) {
      // Jika ada gambar, update termasuk gambar baru
      const updatedProductWithImage = await this.prisma.product.update({
        where: { id },
        data: {
          name,
          category,
          price,
          description,
          image: image.filename,
        },
      });
      return updatedProductWithImage;
    } else {
      // Jika tidak ada gambar, update tanpa menyentuh field gambar
      const updatedProductWithoutImage = await this.prisma.product.update({
        where: { id },
        data: {
          name,
          category,
          price,
          description,
        },
      });
      return updatedProductWithoutImage;
    }
  }

  async deleteProduct(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}