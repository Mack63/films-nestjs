import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./role.model";
import {User} from "../users/user.model";
import {UserRole} from "./user_role.model";
import {Profile} from "../profile/profile.model";

@Module({
  imports: [SequelizeModule.forFeature([Role, User, UserRole, Profile])],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService]
})
export class RolesModule {}
