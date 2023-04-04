import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs';
import * as uuid from 'uuid';
import {InjectModel} from "@nestjs/sequelize";
import {File} from "./files.model";
import {CreateFileDto} from "./dto/create-file.dto";


@Injectable()
export class FilesService {
    constructor(
        @InjectModel(File)
        private fileModel: typeof File
    ) {}

    async createFile(file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteUnused(){
        const filePath = path.resolve(__dirname, '..', 'static')
        let info = ''
        const files = await this.fileModel.findAll({where: {essenceTable: null, essenceId: null}})
        files.forEach(file => {
                fs.unlink(path.join(filePath, file.filePath), function(err){
                    if(err) info += err + '/n';
                    info += "файл удален" + '/n';
                })
            }
        )
        await this.fileModel.destroy({where: {essenceTable: null, essenceId: null}})
        return info
    }

    async create(dto: CreateFileDto, filePath: any) {
        const fileName = await this.createFile(filePath);
        const post = await this.fileModel.create({...dto, filePath: fileName})
        return post;
    }

}
