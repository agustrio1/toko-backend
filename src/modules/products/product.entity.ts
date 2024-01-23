import { Prisma } from '@prisma/client';

export class Product implements Prisma.ProductCreateInput {
  id?: string;
  name: string;
  category: string;
  image: string;
  price: Prisma.Decimal;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  reviews?: Prisma.ReviewCreateNestedManyWithoutProductInput;
  carts?: Prisma.CartCreateNestedManyWithoutProductInput;
}
