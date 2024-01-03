import { Module } from '@nestjs/common';
import { GeminisService } from './geminis.service';
import { GeminisController } from './geminis.controller';
import { PdfService } from 'src/services/pdf.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PdfDocument, PdfSchema } from 'src/schemas/pdf.schema';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: PdfDocument.name, schema: PdfSchema }]),
  ],
  controllers: [GeminisController],
  providers: [GeminisService, PdfService],
})
export class GeminisModule {}
