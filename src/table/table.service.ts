import { BadRequestException, Injectable, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Table, TableDocument } from "../common/schemas/Table.schema";
import { CreateTableDto } from "./dto/create-table.dto";
import { EditTableDto } from "./dto/edit-table.dto";

const NOT_FOUND = 'Table with this name not found!'
const ALREADY_EXIST = 'Table with this name already exist'

@Injectable()
export class TableService {
  constructor(
    @InjectModel(Table.name)
    private tableModel: Model<TableDocument>
  ) {}

  async getAll() {
    return this.tableModel.find().exec();
  }

  async getById(id: any) {
    try {
      const table = await this.tableModel.findById(id)
      if (!table) throw new BadRequestException(NOT_FOUND)

      return table
    } catch (e) {
      throw new BadRequestException(NOT_FOUND)
    }
  }

  async getByName(name: string) {
    const table = await this.tableModel.findOne({ name })
    if (!table) throw new BadRequestException(NOT_FOUND)

    return table
  }

  async editByName(name: string, dto: EditTableDto) {
    const table = await this.tableModel.findOne({ name });
    if (!table) throw new BadRequestException(NOT_FOUND)

    if (dto.name) table.name = dto.name;
    if (dto.color) table.color = dto.color;

    return table.save();
  }

  async create(dto: CreateTableDto) {
    const { name } = dto
    const table = await this.tableModel.findOne({ name })
    if (table) throw new BadRequestException(ALREADY_EXIST)

    const newTable = new this.tableModel(dto);
    return await newTable.save();
  }

  async deleteByName(name: string) {
    const table = await this.tableModel.findOne({ name });
    if (!table) throw new BadRequestException(NOT_FOUND)

    return table.delete()
  }

  async isExistById(id: string) {
    const table = await this.tableModel.findOne({ _id: id })
    return !!table
  }
}
