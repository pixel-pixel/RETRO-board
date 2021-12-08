import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Res } from "@nestjs/common";
import { ChangeTaskTextDto } from "../table/dto/change-task-text.dto";
import { AssignTaskDto } from "../table/dto/assign-task.dto";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "../table/dto/create-task.dto";

@Controller('task')
export class TaskController {

  constructor(
    private readonly taskService: TaskService
  ) {}

  @Get() getAllTasks() {
    return this.taskService.getAll()
  }

  @Get(':id') getTaskById(
    @Param('id') id: string) {

    return this.taskService.getById(id)
  }

  @Get('table/:tableName') getAllTasksFromTable(
    @Param('tableName') name: string) {

    return this.taskService.getAllFromTable(name)
  }

  @Post() createTask(
    @Body() body: CreateTaskDto) {

    return this.taskService.create(body)
  }

  @Put(':id/text') changeTaskTextById(
    @Param('id') id: string,
    @Body() body: ChangeTaskTextDto) {

    return this.taskService.changeTextById(id, body)
  }

  @Put(':id/assign') assignTaskById(
    @Param('id') id: string,
    @Body() body: AssignTaskDto) {

    return this.taskService.assignById(id, body)
  }

  @Delete(':id') deleteTaskById(
    @Param('id') id: string) {

    return this.taskService.deleteById(id)
  }

  @Delete('table/:tableName') deleteAllFromTale(
    @Param('tableName') name) {

    return this.taskService.deleteAllFromTable(name)
  }
}
