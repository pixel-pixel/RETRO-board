import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "../common/schemas/Task.schema";
import { TableModule } from "../table/table.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema }
    ]),
    TableModule
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule {}
