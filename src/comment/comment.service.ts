import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "../common/schemas/Task.schema";
import { Model } from "mongoose";
import { TaskService } from "../task/task.service";
import { Comment, CommentDocument } from "../common/schemas/Comment.schema";
import { CreateCommentDto } from "../table/dto/create-comment.dto";

const COMMENT_NOT_FOUND = 'Comment with this id not found'

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)//
    private commentModel: Model<CommentDocument>,//
    private taskService: TaskService
  ) {}

  async getAll() {
    return this.commentModel.find().exec()
  }

  async getById(id: string) {
    const task = await this.commentModel.findOne({_id: id})
    if (!task) throw new BadRequestException(COMMENT_NOT_FOUND)

    return task
  }

  async getAllFromTask(id: string) {
    const task = await this.taskService.getById(id)

    const { _id } = task
    return this.commentModel.find({ taskId: _id })
  }

  async create(dto: CreateCommentDto) {
    const { taskId } = dto
    await this.taskService.getById(taskId)

    const comment = new this.commentModel(dto)
    return comment.save()
  }

  async deleteById(id: string) {
    const comment = await this.commentModel.findOne({_id: id})
    if (!comment) throw new BadRequestException(COMMENT_NOT_FOUND)

    return comment.delete()
  }

  async deleteAllFromTask(taskId: string): Promise<any> {
    const task = await this.taskService.getById(taskId)

    return this.commentModel.deleteMany({ tableId: task._id })
  }
}
