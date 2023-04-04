import {Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile} from '@nestjs/common';
import {TextBlockService} from "./text-block.service";
import {TextBlockDto} from "./dto/text-block.dto";

@Controller('textBlock')
export class TextBlockController {
    constructor(private textBlock: TextBlockService) {
    }

    @Get()
    getAllTextBlocks(){
        return this.textBlock.findAll()
    }

    @Get('/:group')
    getTextBlocksByGroup(@Param() group: string){
        return this.textBlock.findByGroup(group)
    }

    @Post()
    async create(@Body() dto: TextBlockDto, @UploadedFile() image){
        return this.textBlock.createTextBlock(dto, image)
    }

    @Patch('/:id')
    async update(@Body() dto: TextBlockDto, @Param() id: number){
        return this.textBlock.updateTextBlock(dto, id)
    }

    @Delete('/:id')
    async delete(@Param() id: number){
        return this.textBlock.deleteTextBlock(id)
    }
}
