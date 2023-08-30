import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: 'course-project-a0c65',
      clientEmail: 'firebase-adminsdk-36yrv@course-project-a0c65.iam.gserviceaccount.com',
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCjEjTyQ0JimoLP\nRLm9zslA5tHO21KGEKibUP3Y+wGe76EzhFzCc7yyl6k0RH3fkuhHqZ5zbW7ouJQy\n4itBbQFTaIPOeJrEoxFj8ZLVp3FNsL4JKC10Sv6qL1d8LK01UN5FKTIXBckWuz4G\n2eh63QfdL2JjL4rfCzT917qTcGZx5njZZnQKhkLfF/h6AN/D2RtIXj+p7WRwgQWS\n2DLchacI79hmNiiHDUioJfsu7rOFRHUbalKKugywzTAbySRrBLzN2TLmWE1eXE0z\ndViZtFbs26zIC42TKqgupmx8ul/6HYEfR0tfrOA+WkxkTJJVUT6tPhmLQL6GoQpB\nFfNh+rgNAgMBAAECggEAOMH9CLdtUzmZPwAaMBzZwou0Se3fdsc0kD6r5ApVgZbB\nQleXG51B990+qPEP6LHOxCae/mj/+eNIvb8ntBF3LStK+SHUKI3jXyh1ZYTutE5I\njpJb48a4hc6NgixgqxZ3DpZsl0PNvmo0iBjvSFhHRO6ZrZEeIkzZyGJ+T5QHLCwv\n2G/c6kiKefsuMq/4PwLjl/bCSJaS9OBWrsfUSDK2FRjZme6PCduzKzQHH+iIfocl\nvCOWQDZty1IyPrZC2TdVfBJgJNmWNwN7sYKY3rAetSGabWhrw3j3OwV2xNsdb30D\nUqWZ0oROsb1hdCNkkNW8Mb7FI1QmZRRzkmabcxRqFwKBgQDU+6G+B3SVBFmUAGa7\nXpnLJdsnWl6T8lD393GeQY+tSWfTqQgEKzSyeXowCYiigozsOzIWbfXWmIYI4ZDH\n6Epfu4yF5LZMfwmKATH5L4l6TQxn0KnojiRBEa8gH7ANj9mtrxVOxQNE4/pGxcuy\nD64zNEyRkSBw0CzEGQlLFZSnGwKBgQDEAd1RoInAAdwAiVtwyM3dekm+P6r3cUt+\nE3UiybcsuBjO/UW+frrRTj6XTXfiRxuSmlee8vhosMN8Q65V+TvyUI9kvsURkicD\nZxMr9Frp8WnaXY/hi8JMyMw0Z5GWmrKtOPT9mJcnbl+awpTHEBVcaBe6yDKn9vcU\ntFKOKe9H9wKBgQCFbJ4GzeTa9b6oWRgCiWEPQsfn/1UAmezfasRiv++iPzor/thm\nxCpfJHrHXTGbnO1rkCnwozI/HY3aQnTQx1TQZE3EE2OgyHTRX65OzNjzJRGAd9f5\nOBK+MLXlCfTgih10ERroHcPOhINlksPo6KnYqgrNpn0ML13b+1M3Fm3pwQKBgHV0\nSJNpiCIu+w63QLxNGE/nv9jpfiHZGkvqjP7TsZhymSswSmLkvj4+jPNN0NEfmz42\njtsI7iKOChak2Atc1rdV3xeX2a+1zPsVAUANpY0axTu9ZULa5QvuJ7Aff/anrPpw\nbx6oGavfUBsFDvJaiPJezhl3biOIsncNt4rJRkHxAoGAOtDKzTdhzK0EJ8f4E8U5\nEj8IA+LSC/kv+Qep3+jSXJ4sQrG+8sF0u/R/EfjY71kGL/jOoG7Ju58eX7xqcPLa\nud7jxSg0irSjpVB7QjyTFgZqR1iw2RpKjsEx0Hh/7v1H8mRFZMelT11jguBpDYH/\nOl1TRA4NM8l9SgF5Xzdii9U=\n-----END PRIVATE KEY-----\n",

    })
  })
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4200', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  };
  app.enableCors(corsOptions)
  await app.listen(3000);
}
bootstrap();
