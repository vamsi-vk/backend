import {Schema,SchemaFactory,Prop} from "@nestjs/mongoose"
import { Document, model } from "mongoose"
import {IsEmail,IsNotEmpty,IsString} from 'class-validator';
@Schema()
export class Users{
    @Prop({required:true,unique:true})
    @IsEmail()
    email:string
    @Prop()
    password:string
}
export type userModel= Users & Document
export const userSchema=SchemaFactory.createForClass(Users)
