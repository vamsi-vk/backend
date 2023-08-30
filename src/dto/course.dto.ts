import {IsEmail,IsNotEmpty,IsString} from 'class-validator';
export class CourseDto{
    id:number
    @IsNotEmpty()
    @IsString()
    title:string
    @IsNotEmpty()
    completed:boolean
}