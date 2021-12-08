import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Res } from "@nestjs/common";
import { TableService } from "./table.service";
import { CreateTableDto } from "./dto/create-table.dto";
import { EditTableDto } from "./dto/edit-table.dto";

@Controller("table")
export class TableController {
  constructor(
    private tableService: TableService
  ) {}

  @Get() getAll() {
    return this.tableService.getAll()
  }

  @Get(':name') getTable(
    @Param('name') name: string) {

    return this.tableService.getByName(name)
  }

  @Put(':name') editTable(
    @Param('name') name: string,
    @Body() dto: EditTableDto) {

    return this.tableService.editByName(name, dto)
  }

  @Post() createTable(
    @Body() dto: CreateTableDto) {

    return this.tableService.create(dto)
  }

  @Delete(":name") deleteTable(
    @Param("name") name: string) {

    return this.tableService.deleteByName(name)
  }
}
