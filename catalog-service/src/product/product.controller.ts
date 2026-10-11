import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseArrayPipe,
    ParseIntPipe,
    Post,
    Put,
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
import { CreateUnitDto } from "./dto/create-unit.dto";

@ApiTags("Товары")
@ApiExtraModels(CreateProductDto)
@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @ApiOperation({ summary: "Получить список продуктов" })
    @ApiQuery({
        name: "search",
        required: false,
        description: "Подстрока для поиска по названию продукта",
        example: "мол",
    })
    @ApiOkResponse({ description: "Список активных продуктов" })
    findAll(@Query("search") search?: string) {
        return this.productService.findAll(search);
    }

    @Get(":id")
    @ApiOperation({ summary: "Получить продукт по идентификатору" })
    @ApiParam({ name: "id", description: "Идентификатор продукта", example: 1 })
    @ApiOkResponse({ description: "Найденный продукт" })
    @ApiNotFoundResponse({ description: "Продукт не найден" })
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.productService.findOne(id);
    }

    @Put()
    @ApiOperation({ summary: "Создать продукт" })
    @ApiBody({ type: CreateProductDto })
    @ApiCreatedResponse({ description: "Продукт успешно создан" })
    @ApiNotFoundResponse({
        description: "Указанная единица измерения не найдена",
    })
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Put("few")
    @ApiOperation({ summary: "Создать несколько продуктов" })
    @ApiBody({ type: [CreateProductDto] })
    @ApiCreatedResponse({ description: "Продукты успешно созданы" })
    @ApiNotFoundResponse({
        description: "Указанная единица измерения не найдена",
    })
    createMany(
        @Body(
            new ParseArrayPipe({
                items: CreateProductDto,
                whitelist: true,
                forbidNonWhitelisted: true,
            }),
        )
        createProductDtos: CreateProductDto[],
    ) {
        return this.productService.createMany(createProductDtos);
    }

    @Delete(":id")
    @ApiOperation({ summary: "Удалить продукт" })
    @ApiParam({ name: "id", description: "Идентификатор продукта", example: 1 })
    @ApiOkResponse({ description: "Продукт помечен как удалённый" })
    @ApiNotFoundResponse({ description: "Продукт не найден" })
    remove(@Param("id", ParseIntPipe) id: number) {
        return this.productService.remove(id);
    }

    @Put("units")
    @ApiOperation({ summary: "Создать единицу измерения" })
    @ApiBody({ type: CreateUnitDto })
    @ApiCreatedResponse({ description: "Единица измерения успешно создана" })
    createUnit(@Body() dto: CreateUnitDto) {
        return this.productService.createUnit(dto);
    }
}
