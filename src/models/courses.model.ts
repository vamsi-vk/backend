import { SchemaFactory,Schema,Prop } from "@nestjs/mongoose";
import { Document,Model } from "mongoose";
@Schema()
export class Courses{
    @Prop({required:true,unique:true})
    id:Number 
    @Prop({required:true})
    title:String
    @Prop({required:true})
    completed:boolean
}
export type CourseModel=Courses&Document 
export const courseSchema=SchemaFactory.createForClass(Courses)