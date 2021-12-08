import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

type Log = {type: string, date: string}

@Schema()
export class Comment {
  @Prop() text: string
  @Prop() assigned: string | undefined
  @Prop() taskId: string
  @Prop() log: Log[]
}

export type CommentDocument = Comment & Document
export const CommentSchema = SchemaFactory.createForClass(Comment)
