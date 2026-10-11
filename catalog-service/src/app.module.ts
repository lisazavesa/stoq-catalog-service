import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { DishesModule } from './dishes/dishes.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [ProductModule, PrismaModule, DishesModule, RecipesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
