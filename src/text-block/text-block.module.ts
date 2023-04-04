import { Module } from '@nestjs/common';
import {TextBlockService} from "./text-block.service";
import {TextBlockController} from "./text-block.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {TextBlock} from "./text-block.model";
import {FilesModule} from "../files/files.module";

@Module({
        imports: [SequelizeModule.forFeature([TextBlock]),
                FilesModule
       ],
        providers: [TextBlockService],
        controllers: [TextBlockController],

})
export class TextBlockModule {}

