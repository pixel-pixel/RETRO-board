import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "../table/dto/create-comment.dto";

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @Get() getAllComments() {
    return this.commentService.getAll()
  }

  @Get(':id') getCommentById(
    @Param('id') id: string) {

    return this.commentService.getById(id)
  }

  @Get('task/:tableId') getAllCommentsFromTask(
    @Param('tableId') id: string) {

    return this.commentService.getAllFromTask(id)
  }

  @Post() createComment(
    @Body() body: CreateCommentDto) {

    return this.commentService.create(body)
  }

  @Delete(':id') deleteCommentById(
    @Param('id') id: string) {

    return this.commentService.deleteById(id)
  }

  @Delete('task/:taskId') deleteAllCommentsFromTask(
    @Param('taskId') id: string) {

    return this.commentService.deleteAllFromTask(id)
  }
}
