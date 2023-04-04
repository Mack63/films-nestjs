import { Injectable } from '@nestjs/common';
import {ProfileCreateDto} from "./dto/profile-create.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {ProfileUpdateDto} from "./dto/profile-update.dto";

@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile) private profileRepository: typeof Profile) {
    }

    async createProfile(dto: ProfileCreateDto){
        const profile = await this.profileRepository.create(dto);
        return profile;
    }

    async updateProfile(userId: number, dto: ProfileUpdateDto): Promise<void> {
        await this.profileRepository.update(dto, {where: {userId}})
    }
}
