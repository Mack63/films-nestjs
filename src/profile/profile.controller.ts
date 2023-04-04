import {Body, Controller, Get, Patch, Req, UseGuards} from '@nestjs/common';
import {RolesGuard} from "../auth/roles.guard";
import {ProfileService} from "./profile.service";
import {ProfileUpdateDto} from "./dto/profile-update.dto";
import {Roles} from "../auth/roles-auth.decorator";

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService) {
    }
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Patch()
    update(@Body() dto: ProfileUpdateDto, @Req() request){
        const userId = request.userId
        return this.profileService.updateProfile(userId, dto)
    }
}
