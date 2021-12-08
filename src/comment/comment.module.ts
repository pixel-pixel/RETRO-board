import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentSchema } from "../common/schemas/Comment.schema";
import { TaskModule } from "../task/task.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema }
    ]),
    TaskModule
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
