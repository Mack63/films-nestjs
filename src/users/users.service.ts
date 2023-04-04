import {Body, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create_user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {ProfileCreateDto} from "../profile/dto/profile-create.dto";
import {UserProfileDto} from "./dto/user_profile.dto";
import {ProfileService} from "../profile/profile.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private roleService: RolesService,
        private profileService: ProfileService
    ) {}

    async createUser(@Body() dto: UserProfileDto): Promise<User>{
        let userDTO: CreateUserDto = {
            ...dto
        }
        const user = await this.userModel.create(userDTO)
        const role = await this.roleService.getRoleByValue("USER")
        //const role = await this.roleService.getRoleByValue("ADMIN")
        await user.$set('roles', [role.id])
        user.roles = [role]
        let profDTO: ProfileCreateDto = {
            ...dto, name: user.firstName, userId: user.id
        }
        await this.profileService.createProfile(profDTO)
        return user
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll({include: {all: true}});
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findOne({
            where: {
                id,
            },
        });
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy()
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({where: {email}, include: {all: true}})
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userModel.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }
}
