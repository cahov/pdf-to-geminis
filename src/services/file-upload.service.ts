import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileUploadService {
  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided.');
    }
    const fileBuffer = file.buffer;
    const uploadPath = path.join(__dirname, '..', 'uploads');

    try {
      await fs.promises.mkdir(uploadPath, { recursive: true });
    } catch (error) {
      console.error('Error creating directory:', error);
      throw error;
    }

    const uniqueFileName = `${Date.now()}-${file.originalname.replace(
      /\s/g,
      '_',
    )}`;
    const filePath = path.join(uploadPath, uniqueFileName);

    try {
      await fs.promises.writeFile(filePath, file.buffer);
      console.log('File written successfully:', filePath);
    } catch (error) {
      console.error('Error writing file:', error);
      throw error;
    }
    return { filePath, fileBuffer };
  }
}
