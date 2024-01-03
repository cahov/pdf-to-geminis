import { Injectable } from '@nestjs/common';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';
import { PdfService } from 'src/services/pdf.service';
import { ConfigService } from '@nestjs/config';

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

@Injectable()
export class GeminisService {
  constructor(
    private readonly pdfService: PdfService,
    private readonly configService: ConfigService,
  ) {}
  private genAI = new GoogleGenerativeAI(
    this.configService.get<string>('GEMINIS_API_KEY'),
  );
  private model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  async getAnswer(id: string, question: string) {
    console.log(this.configService.get<string>('GEMINIS_API_KEY'));
    const foundPdf = await this.pdfService.getDocumentPDFById(id);
    const prompt = `Basado en el siguiente documento:"${foundPdf.content}" responde o sigue la siguiente pregunta o instruccion: "${question}"`;
    const parts = [{ text: prompt }];
    const answer = await this.model.generateContent({
      contents: [{ role: 'user', parts }],
      generationConfig,
      safetySettings,
    });
    return answer.response.candidates[0].content.parts[0].text;
  }
}
