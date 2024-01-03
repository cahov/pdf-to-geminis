import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PdfDocument extends Document {
  @Prop()
  filename: string;

  @Prop()
  content: string;

  @Prop({ type: Buffer })
  buffer: Buffer;
}

export const PdfSchema = SchemaFactory.createForClass(PdfDocument);
