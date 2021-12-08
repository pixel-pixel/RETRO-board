import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableModule } from './table/table.module';
import { MongooseModule } from '@nestjs/mongoose'
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    TableModule,
    MongooseModule.forRoot('mongodb+srv://pixel:kek123@cluster0.mjo9s.mongodb.net/retro-board?retryWrites=true&w=majority'),
    TaskModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
