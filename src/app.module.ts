import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfService } from './services/pdf.service';
import { FileUploadService } from './services/file-upload.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PdfDocument, PdfSchema } from './schemas/pdf.schema';
import { GeminisModule } from './geminis/geminis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost:27017/resumata'),
    MongooseModule.forFeature([{ name: PdfDocument.name, schema: PdfSchema }]),
    GeminisModule,
  ],
  controllers: [AppController],
  providers: [AppService, PdfService, FileUploadService],
})
export class AppModule {}
