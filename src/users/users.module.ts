import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Role} from "../roles/role.model";
import {UserRole} from "../roles/user_role.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {ProfileModule} from "../profile/profile.module";
import {Profile} from "../profile/profile.model";

@Module({
  imports: [SequelizeModule.forFeature([User, Role, UserRole, Profile]), // импортируем моддели таблиц которые потребуются
    RolesModule, // понадобится работа с ролями
    forwardRef(() => AuthModule), // в этом модуле будет аутентификация
    forwardRef(() => ProfileModule) // сдесь же создаем профили
  ],
  exports: [
      UsersService // экспортируем для аутентфикации
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
