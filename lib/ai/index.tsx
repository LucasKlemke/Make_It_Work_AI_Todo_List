import { createOpenAI } from '@ai-sdk/openai';
import dotenv from 'dotenv';

dotenv.config();

export const openai = createOpenAI({
  // custom settings, e.g.
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict', // strict mode, enable when using the OpenAI API
});

