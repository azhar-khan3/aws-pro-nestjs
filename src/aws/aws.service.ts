import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
@Injectable()
export class AwsService {

    constructor() { }

    async getObject(bucket: string, key: string) {
        const filePath = path.join('./uploads', bucket, key);
        if (!fs.existsSync(filePath)) {
            throw new NotFoundException('Object not found');
        }
        return fs.createReadStream(filePath);
    }

    async putObject(bucket: string, file: Express.Multer.File) {
        const destination = path.join('./uploads', bucket);
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
        }
        const fileName = uuid();
        console.log(fileName)
        const fileExtension = file.originalname.split(".")[1];
        const newFileName = fileName + "." + fileExtension;
        fs.copyFileSync(file.path, path.join(destination, newFileName));
        return { bucket, key: fileName };
    }


    async deleteObject(bucket: string, key: string) {
        const filePath = path.join('./uploads', bucket, key);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return { message: 'Object deleted' };
        }
        throw new NotFoundException('Object not found');
    }

    listObjects(bucket: string) {
        const folderPath = path.join('./uploads', bucket);
        if (!fs.existsSync(folderPath)) {
            return [];
        }
        const files = fs.readdirSync(folderPath);
        return files.map((file) => ({ bucket, key: file }));
    }

    listBuckets() {
        const rootPath = './uploads';
        if (!fs.existsSync(rootPath)) {
            return [];
        }
        const buckets = fs.readdirSync(rootPath);
        return buckets;
    }
}
