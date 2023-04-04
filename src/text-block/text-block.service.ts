import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {TextBlock} from "./text-block.model";
import {TextBlockDto} from "./dto/text-block.dto";
import {FilesService} from "../files/files.service";

@Injectable()
export class TextBlockService {
    constructor(
        @InjectModel(TextBlock)
        private textBlockModel: typeof TextBlock,
        private filesService: FilesService
    ) {}

    async findAll(): Promise<TextBlock[]>{
        return this.textBlockModel.findAll()
    }

    async createTextBlock(dto: TextBlockDto, image: any): Promise<TextBlock>{
        const fileName = await this.filesService.createFile(image);
        return this.textBlockModel.create({...dto, image: fileName})
    }

    async updateTextBlock(dto: TextBlockDto, id): Promise<void>{
        await this.textBlockModel.update(dto, {where: {id}})
    }

    async deleteTextBlock(id): Promise<void>{
        await this.textBlockModel.destroy({where: {id}})
    }

    findByGroup(group): Promise<TextBlock[]>{
        return this.textBlockModel.findAll({where: {group}})
    }
}
