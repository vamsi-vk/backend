import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {MongooseModule} from '@nestjs/mongoose';
import { userSchema } from 'src/models/users.model';

@Module({
  imports:[MongooseModule.forFeature([{name:'Users',schema:userSchema}])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
