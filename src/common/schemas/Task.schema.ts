import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

type Log = {type: string, date: string}

@Schema()
export class Task {
  @Prop() text: string
  @Prop() assigned: string | undefined
  @Prop() tableId: string
  @Prop() log: Log[]
}

export type TaskDocument = Task & Document
export const TaskSchema = SchemaFactory.createForClass(Task)
