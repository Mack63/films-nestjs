import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthController} from "./auth.controller";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({        // регистрация JwtModule для создания токенов для авторизации
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  exports: [
      AuthService,
      JwtModule   // экспортируем для гуарда для users и profiles
  ]
})
export class AuthModule {}
