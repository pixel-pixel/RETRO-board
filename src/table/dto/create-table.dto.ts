import { IsNotEmpty } from "class-validator";

export class CreateTableDto {
  @IsNotEmpty()
  readonly name: string

  @IsNotEmpty()
  readonly color: string
}
