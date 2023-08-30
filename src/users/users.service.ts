import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { userModel } from '../models/users.model'
import { Model } from 'mongoose';
import * as admin from 'firebase-admin'
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UsersService {
    constructor(@InjectModel('Users') private readonly usersModel: Model<userModel>) { }
    async updateUser(createUserDto, params, req) {
        try {
            const toUpdateInFirebase = await this.usersModel.findOne({ _id: new ObjectId(params.id) })
            const reqUser = await admin.auth().getUserByEmail(toUpdateInFirebase.email)
            const toUpdate = {}
            const fileds = Object.keys(createUserDto)
            //updating only mentioned fields
            for (let field of fileds) {
                if (this.usersModel.schema.paths[field]) {
                    if (field == 'password') {
                        const hashing = await bcrypt.hash(createUserDto[field], 8)
                        toUpdate[field] = hashing
                    }
                    else {
                        toUpdate[field] = createUserDto[field]
                    }
                }
            }
            try {
                const updatedUser = await this.usersModel.findOneAndUpdate({ _id: new ObjectId(params.id) }, { $set: toUpdate }, { new: true })
                const firebaseUpdation = await admin.auth().updateUser(reqUser.uid, toUpdate)
                console.log(firebaseUpdation)
                return updatedUser
            }
            catch (e) {
                return e
            }


        }
        catch (e) {
            return 'There is a error in validating this token'
        }

        // 
    }
}
