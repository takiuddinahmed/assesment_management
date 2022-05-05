import { IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';

export default class CreateGradeDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(100)
    mark: number;

    @IsNotEmpty()
    @IsString()
    remark: string;
}
