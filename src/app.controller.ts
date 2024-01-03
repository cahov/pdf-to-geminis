import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PdfService } from './services/pdf.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './services/file-upload.service';
import * as fs from 'fs/promises';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly pdfService: PdfService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPdf(@UploadedFile() file: Express.Multer.File) {
    const { filePath, fileBuffer } =
      await this.fileUploadService.uploadFile(file);

    try {
      const text = await this.pdfService.extractTextFromPdf(filePath);
      const pdfSave = await this.pdfService.savePdfFile(
        file.originalname,
        text,
        fileBuffer,
      );

      await fs.unlink(filePath);
      return { fileId: pdfSave.id, message: 'PDF upload succesly' };
    } catch (error) {
      console.error('Error processing PDF:', error);
      throw error;
    }
  }
}
