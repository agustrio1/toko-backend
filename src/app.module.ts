import { Module } from "@nestjs/common";
import { ProductsModule } from "./modules/products/product.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [ProductsModule, UserModule],
})
export class AppModule {}