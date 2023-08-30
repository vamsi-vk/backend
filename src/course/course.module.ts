import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { MongooseModule } from '@nestjs/mongoose';
import { courseSchema } from 'src/models/courses.model';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Courses', schema: courseSchema }])],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule { }
