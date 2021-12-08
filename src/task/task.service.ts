import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Response } from "express";
import { CreateTaskDto } from "../table/dto/create-task.dto";
import { ChangeTaskTextDto } from "../table/dto/change-task-text.dto";
import { AssignTaskDto } from "../table/dto/assign-task.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "../common/schemas/Task.schema";
import { Model } from "mongoose";
import { TableService } from "../table/table.service";

const TASK_NOT_FOUND = 'Task with this id not found'

@Injectable()
export class TaskService {

  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
    private tableService: TableService
  ) {}

  async getAll() {
    return this.taskModel.find().exec()
  }

  async getById(id: string) {
    const task = await this.taskModel.findOne({_id: id})
    if (!task) throw new BadRequestException(TASK_NOT_FOUND)

    return task
  }

  async getAllFromTable(tableName: string) {
    const table = await this.tableService.getByName(tableName)

    const { _id } = table
    return this.taskModel.find({ tableId: _id })
  }

  async create(dto: CreateTaskDto) {
    const { tableId } = dto
    await this.tableService.getById(tableId)

    const task = new this.taskModel(dto)
    return task.save()
  }

  async changeTextById(id: string, dto: ChangeTaskTextDto) {
    const task = await this.taskModel.findOne({_id: id})
    if (!task) throw new BadRequestException(TASK_NOT_FOUND)

    task.text = dto.text
    return task.save()
  }

  async assignById(id: string, dto: AssignTaskDto) {
    const task = await this.taskModel.findOne({_id: id})
    if (!task) throw new BadRequestException(TASK_NOT_FOUND)

    task.assigned = dto.assigned || undefined
    return task.save()
  }

  async deleteById(id: string) {
    const task = await this.taskModel.findOne({_id: id})
    if (!task) throw new BadRequestException(TASK_NOT_FOUND)

    return task.delete()
  }

  async deleteAllFromTable(tableName: string): Promise<any> {
    const table = await this.tableService.getByName(tableName)

    return this.taskModel.deleteMany({ tableId: table._id })
  }
}
