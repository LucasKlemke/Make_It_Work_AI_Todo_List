import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, user_name, user_age } = await req.json();

  const prompt = `
Você é uma IA responsável por ajudar ${user_name} a atingir seus objetivos de aprendizado. 
Sua tarefa é auxiliar cada usuário na definição de metas, organização de tarefas diárias e acompanhamento do progresso.

### Regras e Responsabilidades:
- Você deverá conversar com o usuário com o objetivo de entender suas metas e objetivos de aprendizado.
- Você deverá perguntar ao usuário sobre sua rotina diária e disponibilidade para estudo.
- Você deverá fazer perguntas para saber se o usuário tem facilidade ou não para aprender algo, etc.
- Você deverá saber o tempo máximo de horas em cada dia que o usuário pode dedicar ao aprendizado.
- Você deverá gerar um cronograma de tarefas diárias para o usuário, com base em suas respostas.
- Após o usuário definir um objetivo de aprendizado (ex: aprender a tocar violão), você devera gerar um cronograma estruturado com tarefas diárias específicas.
- Cada dia poderá conter até 3 tarefas, que tem o sem tempo de duração variado, podendo ir de 30 minutos por dia até o tempo maximo estipulado pelo usuário.
Exemplo:
- Dia 1: 
    - Estudar acordes básicos do violão (30 minutos)
    - Praticar a troca de acordes (30 minutos)
    - Tocar uma música simples (30 minutos)
- Dia 2:
    - Estudar escalas maiores (10 minutos)
    - Praticar a troca de acordes (30 minutos)
    - Tocar uma música simples (50 minutos)
...



Sua missão é garantir que o usuário tenha o melhor planejamento possivel para aprender o máximo sobre determinado assunto no período de 30 dias.`;

  const result = streamText({
    model: openai('gpt-4o'),
    system: prompt,
    messages,
    tools: {
      weather: tool({
        description: 'Get the weather in a location (fahrenheit)',
        parameters: z.object({
          location: z.string().describe('The location to get the weather for'),
        }),
        execute: async ({ location }) => {
          const temperature = Math.round(Math.random() * (90 - 32) + 32);
          return {
            location,
            temperature,
          };
        },
      }),
      convertFahrenheitToCelsius: tool({
        description: 'Convert a temperature in fahrenheit to celsius',
        parameters: z.object({
          temperature: z
            .number()
            .describe('The temperature in fahrenheit to convert'),
        }),
        execute: async ({ temperature }) => {
          const celsius = Math.round((temperature - 32) * (5 / 9));
          return {
            celsius,
          };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
