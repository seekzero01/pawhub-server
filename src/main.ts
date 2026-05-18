import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import "dotenv/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  app.enableCors({
    origin: ['http://localhost:3000','http://localhost:3001'],
    credentials: true,
  })

  await app.listen(3001)
}

bootstrap()