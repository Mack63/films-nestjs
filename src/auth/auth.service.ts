import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create_user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "../users/user.model";
import {UserProfileDto} from "../users/dto/user_profile.dto";

@Injectable()
export class AuthService {

    bcrypt = require('bcryptjs')
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(user_profileDTO: UserProfileDto) {
        const candidate = await this.userService.getUserByEmail(user_profileDTO.email);
        if (candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await this.bcrypt.hash(user_profileDTO.password, 5);

        const user = await this.userService.createUser({...user_profileDTO, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await this.bcrypt.compare(userDto.password, user.password);
        if (!user){
            throw new UnauthorizedException({message: 'Некорректный емайл'})
        }
        if(!passwordEquals){
            throw new UnauthorizedException({message: 'Некорректный пароль'})
        }
        return user;
    }
}
