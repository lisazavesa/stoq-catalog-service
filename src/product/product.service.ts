import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(search?: string) {
        return this.prisma.product.findMany({
            where: {
                isDeleted: false,
                name: search
                    ? {
                          contains: search,
                          mode: "insensitive",
                      }
                    : undefined,
            },
            include: {
                unit: true,
            },
            orderBy: { name: "asc" },
        });
    }

    async findOne(id: number) {
        const product = await this.prisma.product.findFirst({
            where: {
                id,
                isDeleted: false,
            },
            include: {
                unit: true,
            },
        });

        if (!product) {
            throw new NotFoundException("Продукт не найден");
        }

        return product;
    }

    async create(data: CreateProductDto) {
        const unit = await this.prisma.unit.findUnique({
            where: { id: data.unitId },
        });

        if (!unit) {
            throw new NotFoundException("Единица измерения не найдена");
        }

        return this.prisma.product.create({
            data: {
                name: data.name.trim(),
                unitId: data.unitId,
            },
            include: {
                unit: true,
            },
        });
    }

    async createMany(data: CreateProductDto[]) {
        const products: any[] = [];

        for (const item of data) {
            const product = await this.create(item);
            products.push(product);
        }

        return products;
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.product.update({
            where: { id },
            data: { isDeleted: true },
        });
    }
}
