import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateDto {
    @IsUrl()
    link: string

    @IsNotEmpty()
    @IsString()
    assessmentId: string
}