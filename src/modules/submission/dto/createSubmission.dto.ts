import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateSubmissionDto {
    @IsUrl()
    link: string

    @IsNotEmpty()
    @IsString()
    assessmentId: string
}