import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import * as pdfUtil from 'pdf-to-text';
import { PdfDocument } from 'src/schemas/pdf.schema';
import { promisify } from 'util';

const pdfToTextAsync = promisify(pdfUtil.pdfToText);

@Injectable()
export class PdfService {
  constructor(
    @InjectModel(PdfDocument.name)
    private readonly pdfModel: Model<PdfDocument>,
  ) {}

  async extractTextFromPdf(filePath: string): Promise<string> {
    try {
      const data = await pdfToTextAsync(filePath);
      return data;
    } catch (err) {
      console.error('Error extracting text from PDF:', err);
      throw err;
    }
  }

  async savePdfFile(
    filename: string,
    content: string,
    buffer: Buffer,
  ): Promise<PdfDocument> {
    try {
      const pdf = new this.pdfModel({ filename, content, buffer });
      return pdf.save();
    } catch (err) {
      console.error('Error saving PDF to MongoDB:', err);
      throw err;
    }
  }

  async getDocumentPDFById(id: string) {
    try {
      const findPdf = await this.pdfModel.findById(id).exec();
      return findPdf;
    } catch (error) {
      console.log(error);
    }
  }
}
