import {forwardRef, Module} from '@nestjs/common';
import {ProfileService} from "./profile.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "../roles/role.model";
import {User} from "../users/user.model";
import {UserRole} from "../roles/user_role.model";
import {Profile} from "./profile.model";
import {ProfileController} from "./profile.controller";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [ProfileService],
    controllers: [ProfileController],
    imports: [SequelizeModule.forFeature([Role, User, UserRole, Profile]),
        //forwardRef(() => AuthModule)
    ],
    exports: [
        ProfileService
    ]
})
export class ProfileModule {

}
