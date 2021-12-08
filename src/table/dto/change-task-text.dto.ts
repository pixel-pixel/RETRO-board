import { IsNotEmpty, IsString } from "class-validator";

export class ChangeTaskTextDto {
  @IsString()
  @IsNotEmpty()
  readonly text: string
}
