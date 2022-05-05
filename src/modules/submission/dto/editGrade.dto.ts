import { IsNotEmpty, IsNumber, IsString, Min, Max, ValidateIf } from 'class-validator';

export default class EditGradeDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(100)
    @ValidateIf((o,v)=>v!=null)
    mark: number;

    @IsNotEmpty()
    @IsString()
    @ValidateIf((o,v)=>v!=null)
    remark: string;
}
