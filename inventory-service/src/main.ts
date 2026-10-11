import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Сервис остатков")
    .setDescription("HTTP API для работы с остатками товаров.")
    .setVersion("1.0")
    .addTag("Служебные", "Служебные методы приложения")
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup("api", app, swaggerDocument, {
    customSiteTitle: "Документация API сервиса остатков",
  });

  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
