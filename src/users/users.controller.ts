import { Controller, Post, Get, Patch, Delete, Body, Res, Req, Param, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/users.dto';
import { UsersService } from './users.service';
import * as admin from 'firebase-admin';
import { MiddlewareInterceptor } from 'src/interceptors/authorization.interceptor';
import { Request, Response } from 'express'


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @UseInterceptors(MiddlewareInterceptor)
    @Patch('update/:id')
    async update_user(@Body() createUserDto: CreateUserDto, @Param() params: any, @Req() req: Request) {
        return this.usersService.updateUser(createUserDto, params, req)
    }
}
