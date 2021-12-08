import { IsNotEmpty } from "class-validator";

export class EditTableDto {
  readonly name: string
  readonly color: string
}
