import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseArrayPipe,
    ParseIntPipe,
    Post,
    Query,
} from "@nestjs/common";
import {
    ApiBody,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
    getSchemaPath,
} from "@nestjs/swagger";

import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";

@ApiTags("Товары")
@ApiExtraModels(CreateProductDto)
@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @ApiOperation({ summary: "Получить список товаров" })
    @ApiQuery({
        name: "search",
        required: false,
        description: "Подстрока для поиска по названию товара",
        example: "мол",
    })
    @ApiOkResponse({ description: "Список активных товаров" })
    findAll(@Query("search") search?: string) {
        return this.productService.findAll(search);
    }

    @Get(":id")
    @ApiOperation({ summary: "Получить товар по идентификатору" })
    @ApiParam({ name: "id", description: "Идентификатор товара", example: 1 })
    @ApiOkResponse({ description: "Найденный товар" })
    @ApiNotFoundResponse({ description: "Товар не найден" })
    findOne(@Param("id", ParseIntPipe) id: number) {
      return this.productService.findOne(id);
    }

  @Post()
  @ApiOperation({ summary: "Создать товар" })
  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({ description: "Товар успешно создан" })
  @ApiNotFoundResponse({
    description: "Указанная единица измерения не найдена",
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }


  @Post('few')
  @ApiOperation({ summary: "Создать несколько товаров" })
  @ApiBody({ type: [CreateProductDto] })
  @ApiCreatedResponse({ description: "Товары успешно созданы" })
  @ApiNotFoundResponse({
    description: "Указанная единица измерения не найдена",
  })
  createMany(
    @Body(
      new ParseArrayPipe({
        items: CreateProductDto,
        whitelist: true,
        forbidNonWhitelisted: true,
      })
    )
    createProductDtos: CreateProductDto[]
  ) {
    return this.productService.createMany(createProductDtos);
  }

    @Delete(":id")
    @ApiOperation({ summary: "Удалить товар" })
    @ApiParam({ name: "id", description: "Идентификатор товара", example: 1 })
    @ApiOkResponse({ description: "Товар помечен как удалённый" })
    @ApiNotFoundResponse({ description: "Товар не найден" })
    remove(@Param("id", ParseIntPipe) id: number) {
        return this.productService.remove(id);
    }
}
