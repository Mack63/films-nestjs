import {Body, Controller, Delete, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FilesService} from "./files.service";
import {CreateFileDto} from "./dto/create-file.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('files')
export class FilesController {
    constructor(private fileService: FilesService) {}

    @Delete()
    async deleteUnusedFiles(){
        return this.fileService.deleteUnused()
    }

    @Post()
    @UseInterceptors(FileInterceptor('filePath'))
    createFile(@Body() dto: CreateFileDto,
               @UploadedFile() filePath) {
        return this.fileService.create(dto, filePath)
    }
}
