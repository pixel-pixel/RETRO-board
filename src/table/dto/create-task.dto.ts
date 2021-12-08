import { IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly text: string

  readonly assigned: string

  @IsString()
  @IsNotEmpty()
  readonly tableId: string
}
