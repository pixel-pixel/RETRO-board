import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Table, TableSchema } from "../common/schemas/Table.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Table.name, schema: TableSchema }
    ])
  ],
  providers: [TableService],
  controllers: [TableController],
  exports: [TableService]
})
export class TableModule {}
