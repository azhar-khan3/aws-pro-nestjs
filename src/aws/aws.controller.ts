import { Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AwsService } from './aws.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiAndSecretKeyGuard } from './aws.guard';
@Controller('aws')
export class AwsController {

    constructor(private readonly service: AwsService) { }
     
    // Get an object
    @UseGuards(ApiAndSecretKeyGuard)
    @Get(':bucket/object/:key')
    getObject(@Param('bucket') bucket: string, @Param('key') key: string) {
        return this.service.getObject(bucket, key);
    }

    // Put an object
    @UseGuards(ApiAndSecretKeyGuard)
    @Post(':bucket/object')
    @UseInterceptors(FileInterceptor('file'))
    putObject(@Param('bucket') bucket: string, @UploadedFile() file: Express.Multer.File) {
        return this.service.putObject(bucket, file);
    }

    // Delete an object
    @UseGuards(ApiAndSecretKeyGuard)
    @Delete(':bucket/object/:key')
    deleteObject(@Param('bucket') bucket: string, @Param('key') key: string) {
        return this.service.deleteObject(bucket, key);
    }

    // List of objects
    @UseGuards(ApiAndSecretKeyGuard)
    @Get(':bucket/objects')
    listObjects(@Param('bucket') bucket: string) {
        return this.service.listObjects(bucket);
    }

    // List of buckets
    @UseGuards(ApiAndSecretKeyGuard)
    @Get(':buckets')
    listBuckets() {
        console.log(process.env.apiKey)
        return this.service.listBuckets();
    }
}



