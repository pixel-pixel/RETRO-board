import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  readonly text: string

  @IsString()
  @IsNotEmpty()
  readonly assigned: string

  @IsString()
  @IsNotEmpty()
  readonly taskId: string
}
