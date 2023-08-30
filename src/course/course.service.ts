import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CourseModel } from 'src/models/courses.model';
import { Model } from 'mongoose'
import { MiddlewareInterceptor } from 'src/interceptors/authorization.interceptor';
import { type } from 'os';
@Injectable()
export class CourseService {
    constructor(@InjectModel('Courses') private readonly courseModel: Model<CourseModel>) { }
    async getCourse(params) {
        try {
            const courseById = await this.courseModel.find({ id: params.id })
            return courseById
        }
        catch (e) {
            return e
         }


    }
    async getCourses(query) {
        console.log(query)
        try {
            for (let key in query) {
                if (key == 'title') {
                    if(query[key]==''){
                        return await this.courseModel.find({})
                    }
                    console.log(query[key])
                    const coursesToDisplay = await this.courseModel.find({ title: { $regex: query[key], $options: 'i' } });
                    return coursesToDisplay
                }
                else if (key == 'id') {
                    if(query[key]==''){
                        return await this.courseModel.find({})
                    }
                    const idValue = query[key];
                    const coursesToDisplay = await this.courseModel.aggregate([
                        {
                            $addFields: {
                                idString: { $toString: "$id" }
                            }
                        },
                        {
                            $match: {

                                idString: { $regex: `^${idValue}\\d*$` }

                            }

                        }

                    ]);
 
 

                    return coursesToDisplay
                }
                else if(key =='completed'){
                    if(query[key]==''){
                        return await this.courseModel.find({})
                    }
                    const coursesToDisplay=await this.courseModel.find({completed:query[key]})
                    return coursesToDisplay
                }
            }
            return await this.courseModel.find({})
        }
        catch(e){
            return 'Error while fetching data'
        }
    }
    async postingCourses(courseDto) {
        const inserting = await this.courseModel.insertMany(courseDto)
        return inserting
    }

    async updatingCourse(courseDto, params, req) {
        //const token=req.headers.authorization.
        let toUpdate = {}
        let fields = Object.keys(courseDto)
        for (let field of fields) {
            if (this.courseModel.schema.paths[field] && field != 'id') {
                toUpdate[field] = courseDto[field]
            }
        }
        const updatedCourse = await this.courseModel.findOneAndUpdate({ id: params.id }, { $set: toUpdate }, { new: true })
        return JSON.stringify('Course Edited')
    }
    async addCourse(courseDto) {
        // const courses=await this.courseModel.find({})
        // const ids=courses.map((ele)=>ele.id)
        // console.log(ids)
        // let req_id;
        // const length=courses.length
        // let c=0
        // for(let i=1;i<length;i++){
        //     if(ids.indexOf((i))==-1){
        //         req_id=i
        //         c=1
        //         break
        //     }
        // }
        // if(c==0){
        //     req_id=length+1
        // }
        const courses = await this.courseModel.find({});
        const ids = new Set(courses.map((ele) => ele.id));
        let req_id = 1;
        while (ids.has(req_id)) {
            req_id++;
        }
        console.log(req_id)
        const newCourse = new this.courseModel({
            id: req_id,
            title: courseDto.title,
            completed: courseDto.completed
        })
        try {
            await newCourse.save()
            console.log(newCourse)
            return JSON.stringify('Course Added Successfully')
        }
        catch (e) {
            return e.message
        }
    }
    async deleteCourse(params) {
        try {
            const courseToBeDeleted = await this.courseModel.findOneAndDelete({ id: params.id })
            if (courseToBeDeleted) {
                return JSON.stringify('Selected Course has been deleted')
            }
            else {
                return JSON.stringify('Course not found with the given id')
            }
        }
        catch (e) {
            return e
        }
    }
    // async searchingCourse(params) {
    //     try {
    //         let lowerCaseName = params.name;
    //         if (typeof lowerCaseName === 'string') {
    //             console.log('this is a string')
    //             const coursesToDisplay = await this.courseModel.find({ title: { $regex: lowerCaseName, $options: 'i' } });
    //             if (coursesToDisplay.length == 0) {
    //                 const coursesToDisplay2 = await this.courseModel.find({ id: parseInt(lowerCaseName) })
    //                 return coursesToDisplay2;
    //             }
    //             return coursesToDisplay;
    //         }
    //     } catch (error) {
    //         // Handle errors appropriately (e.g., log or throw)
    //         console.error('Error searching for courses:', error);
    //         throw error;
    //     }


    // }


}
