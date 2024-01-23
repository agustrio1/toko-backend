export class ProductDTO {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateProductDTO extends ProductDTO {}

export class UpdateProductDTO extends ProductDTO {}
