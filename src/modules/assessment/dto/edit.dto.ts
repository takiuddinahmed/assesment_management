import { IsDateString, IsString, ValidateIf } from 'class-validator';

export default class EditDto {
    @IsString()
    id: string;

    @IsString()
    @ValidateIf((object, value) => value != null)
    title!: string | null;

    @IsString()
    @ValidateIf((object, value) => value != null)
    description!: string | null;

    @IsDateString()
    @ValidateIf((object, value) => value != null)
    deadline!: string | null;
}
