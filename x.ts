import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import 'dotenv/config';

async function main() {
  console.log('começou');
  const result = await generateText({
    model: openai.responses('gpt-4o-mini'),
    prompt: 'Como funciona a homeostase ? Procure em 5 fontes diferentes',
    tools: {
      web_search_preview: openai.tools.webSearchPreview(),
    },
    toolChoice: 'required',
  });

  console.log(result.text);
  console.log();
  console.log('Sources:');
  console.log(result.sources);
  console.log();
  console.log('Finish reason:', result.finishReason);
  console.log('Usage:', result.usage);

  console.log('Request:', JSON.stringify(result.request, null, 2));
  console.log('Response:', JSON.stringify(result.response, null, 2));
}

main().catch(console.error);
