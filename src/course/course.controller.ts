import { Controller, Post, Get, Patch, Delete, Body, Param, Req, Query, UseInterceptors } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from 'src/dto/course.dto';
import { MiddlewareInterceptor } from 'src/interceptors/authorization.interceptor';
import {Request,Response} from 'express'
// @UseInterceptors(MiddlewareInterceptor)
@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }
    @Get(':id')
    getCourse(@Param() params: any) {
        return this.courseService.getCourse(params)
    }
    @Get()
    getCourses(@Query() query) {
        return this.courseService.getCourses(query)
    }
    @Post('posting')
    postingCourses(@Body() courseDto: CourseDto) {
        return this.courseService.postingCourses(courseDto)
    }
    @Patch('updatecourse/:id')
    updatingCourse(@Body() courseDto: CourseDto, @Param() params: any, @Req() req: Request) {
        return this.courseService.updatingCourse(courseDto, params, req)
    }
    @Post('addcourse')
    addCourse(@Body() courseDto: CourseDto) {
        return this.courseService.addCourse(courseDto)
    }
    @Delete('deletecourse/:id')
    deleteCourse(@Param() param: any) {
        return this.courseService.deleteCourse(param)
    }
    // @Get('/search/:name')
    // searchingCourse(@Param() params: any) {
    //     return this.courseService.searchingCourse(params)

    // }
}
