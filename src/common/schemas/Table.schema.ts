import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

export type TableDocument = Table & Document

@Schema()
export class Table {
  @Prop() name: string
  @Prop() color: string
}

export const TableSchema = SchemaFactory.createForClass(Table)
