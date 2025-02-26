import { openai } from '@/lib/ai';
import { createDataStreamResponse, generateText } from 'ai';

export async function GET() {
  // const { text } = await generateText({
  //   model: openai('gpt-4-turbo'),
  //   prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  // });

  return createDataStreamResponse({
    status: 200,
    statusText: 'OK',
    headers: {
      'Custom-Header': 'value',
    },
    async execute(dataStream) {
      // Write data
      dataStream.writeData({ value: 'Hello' });

      // Write annotation
      dataStream.writeMessageAnnotation({
        type: 'status',
        value: 'processing',
      });

      // Merge another stream
      const { text } = await generateText({
        model: openai('gpt-4-turbo'),
        prompt: 'Voce so xinga os outros, me xingue',
      });

      dataStream.writeData({ value: text });
    },
    onError: (error) => `Custom error: ${error.message}`,
  });
}
