import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsService } from './aws/aws.service';
import { AwsController } from './aws/aws.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { diskStorage } from 'multer';
import { ApiAndSecretKeyGuard } from './aws/aws.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({}), // Specify the upload directory
    }),
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
  ],
  controllers: [AppController, AwsController],
  providers: [AppService, AwsService, ApiAndSecretKeyGuard,  {
    provide: APP_GUARD,
    useClass: ApiAndSecretKeyGuard,
  },],
})
export class AppModule {

 
}
