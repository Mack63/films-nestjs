import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {File} from "./files.model";

@Module({
  exports: [FilesService], // будет использоваться в text-block
  imports: [SequelizeModule.forFeature([File])],
  providers: [FilesService],
  controllers: [FilesController]
})
export class FilesModule {}
