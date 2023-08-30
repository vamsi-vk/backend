import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://riyazahammad950:mhJQXR43wiRg8GhZ@cluster0.o7qqzhp.mongodb.net/CoursePro?retryWrites=true&w=majority'),
   UsersModule,
   AuthModule,
   CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
