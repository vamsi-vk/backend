import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { userModel } from '../models/users.model';
import { Model } from 'mongoose';
import * as admin from 'firebase-admin';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(@InjectModel('Users') private readonly usersModel: Model<userModel>) { }
    async signupUser(createUserDto, res, req) {
        console.log('hit')
        try {
            const userToStore = new this.usersModel({
                email: createUserDto.email,
            })
            await userToStore.save()
            console.log(userToStore)
            if (userToStore) {
                const firebaseUser=await admin.auth().createUser({
                    email: createUserDto.email,
                    password: createUserDto.password
                })
                // console.log(firebaseUser)
            }
            console.log('saved')
            let obj={message:'User Created Successfully',status:201}
            res.send(obj)
        }
        catch (e) {
            console.log(e)
            if(e.code==11000){
                let obj={error:'User Already Exists',status:406}
                res.send(obj)
            }
            let obj={error:e.message,status:406}
            res.send(obj)
        }
    }
    // async signin_user(body, res) {
    //     try {
    //         const user = await this.usersModel.findOne({email:body.email})
    //         console.log('signin entered')
    //         if (user) {
    //             console.log('user fetched')
    //             //fetching hashed password
    //             const hashedPassword=user.password
    //             const result=await bcrypt.compare(body.password,hashedPassword)
    //             if(result){
    //                 console.log('password comparison done')
    //                 // localStorage.setItem("userdetails",JSON.stringify(user))
    //                 // const current_user=await (admin.auth().currentUser as any)
    //                 const auth=admin.auth()
    //                 const currentUser=await auth.getUserByEmail(body.email)
    //                 console.log(currentUser)
    //                 res.status(200).send('login success')
    //             }
    //             else{
    //                 res.status(401).send('Incorrect Password')
    //             }
    //         }
    //         else {
    //             res.status(401).send('user not found')
    //         }
    //     }
    //     catch (e) {
    //         res.status(400).send(e)
    //     }
    // }
}
