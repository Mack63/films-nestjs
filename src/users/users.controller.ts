import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {UserProfileDto} from "./dto/user_profile.dto";


@Controller('users')
export class UsersController {
    bcrypt = require('bcryptjs')
    constructor(private usersService: UsersService) {}

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAllUsers(){
        return this.usersService.findAll()
    }

    @Post()
    async create(@Body() dto: UserProfileDto){
        const hashPassword = await this.bcrypt.hash(dto.password, 5);
        return this.usersService.createUser({...dto, password: hashPassword})
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/:id')
    deleteUser(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }
}
