import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class User{
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

    @

}


export class UserSchema {

}

export default class UserModel{

}


