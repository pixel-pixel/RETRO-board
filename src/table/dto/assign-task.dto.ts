import { IsString } from "class-validator";

export class AssignTaskDto {
  @IsString()
  readonly assigned: string
}
