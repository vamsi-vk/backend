import { Controller,Post,Get,Body,Patch,Req,Res,UseInterceptors} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as admin from 'firebase-admin';
import { CreateUserDto } from 'src/dto/users.dto';
import { LoginDto } from 'src/dto/login.dto';
import { MiddlewareInterceptor } from '../interceptors/authorization.interceptor';
import {Request,Response} from 'express'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Post('signup')
    async signupUser(@Body() createUserDto:CreateUserDto,@Res() res:Response,@Req() req:Request){
        return this.authService.signupUser(createUserDto,res,req)
    }
    // @UseInterceptors(MiddlewareInterceptor)
    // @Post('signin')
    // async signin_user(@Body() loginDto:LoginDto,@Res() res:Response){
    //     return this.authService.signin_user(loginDto,res)
    // }

}
