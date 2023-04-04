import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { User } from './users/user.model';
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/role.model";
import {UserRole} from "./roles/user_role.model";
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import {Profile} from "./profile/profile.model";
import {FilesModule} from "./files/files.module";
import { TextBlockModule } from './text-block/text-block.module';
import {TextBlock} from "./text-block/text-block.model";
import {File} from "./files/files.model";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path'

@Module({
  imports: [
      ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
        }),
      SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'movies',
    models: [User, Role, UserRole, Profile, File, TextBlock],
  }),
      UsersModule,
      RolesModule,
      AuthModule,
      ProfileModule,
      FilesModule,
      TextBlockModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
