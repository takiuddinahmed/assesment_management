import { IsNotEmpty, IsString, IsUrl, ValidateIf } from 'class-validator';

export class EditSubmissionDto {
    @IsUrl()
    @ValidateIf((o, v) => v != null)
    link: string;

    @IsNotEmpty()
    @IsString()
    id: string;
}
