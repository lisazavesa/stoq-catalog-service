import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from "@nestjs/common";

import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";

@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    findAll(@Query("search") search?: string) {
        return this.productService.findAll(search);
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.productService.findOne(id);
    }

    @Post()
    create(@Body() body: CreateProductDto | CreateProductDto[]) {
        if (Array.isArray(body)) {
            return this.productService.createMany(body);
        }

        return this.productService.create(body);
    }

    @Delete(":id")
    remove(@Param("id", ParseIntPipe) id: number) {
        return this.productService.remove(id);
    }
}
