import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Req, Res, Body, Headers, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as admin from 'firebase-admin'
import { Request, Response } from "express";
@Injectable()
export class MiddlewareInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const req: Request = context.switchToHttp().getRequest()
        const res: Response = context.switchToHttp().getResponse()
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            throw new BadRequestException('Authorization token not provided')
        }
        try {
            await admin.auth().verifyIdToken(token)
            return next.handle()
        }
        catch (error) {
            if (error.code == 'auth/id-token-expired') {
                console.log('expired')
                res.status(401).send('Token has Expired')

            }
        }

    }
}
