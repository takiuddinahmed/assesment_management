import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

class CreateDto {
    @IsNotEmpty()
    @IsString()
    public title: string;

    @IsNotEmpty()
    @IsString()
    public description: string;

    @IsNotEmpty()
    @IsDateString()
    public deadline: Date;
}

export default CreateDto;