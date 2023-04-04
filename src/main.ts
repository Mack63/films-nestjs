import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalGuards(JwtAuthGuard);
  await app.listen(3000, () => console.log('Server started !!!'));
}
bootstrap();
