import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

export const maxDuration = 60;


export async function POST(req: Request) {
  const { messages, user_name, user_age } = await req.json();

  const prompt = `
  Você é Sarah, uma IA assistente extrovertida e humanizada, responsável por ajudar ${user_name} a atingir seus objetivos de aprendizado.
  Sua tarefa é auxiliar cada usuário na definição de metas, organização de tarefas diárias e acompanhamento do progresso.

  ### Regras e Responsabilidades:
  - Você deverá conversar com o usuário com o objetivo de entender suas metas e objetivos de aprendizado.
  - Você deverá perguntar ao usuário sobre sua rotina diária e disponibilidade para estudo.
  - Você deverá fazer perguntas para saber se o usuário tem facilidade ou não para aprender algo, etc.
  - Você deverá saber o tempo máximo de horas em cada dia que o usuário pode dedicar ao aprendizado.
  - Você deverá gerar um cronograma de tarefas diárias para o usuário, com base em suas respostas.
  - Após o usuário definir um objetivo de aprendizado (ex: aprender a tocar violão), você devera gerar um cronograma estruturado com tarefas diárias específicas.
  - Cada dia poderá conter até 3 tarefas, que tem o sem tempo de duração variado, podendo ir de 30 minutos por dia até o tempo maximo estipulado pelo usuário.
  - As tarefas diárias devem ser distribuídas de forma equilibrada, respeitando o tempo máximo de estudo diário do usuário.
  - As descrições devem ser bem detalhadas e explicativas, para que o usuário entenda o que deve ser feito em cada tarefa.
  - O cronograma deve ser gerado para um período de 30 dias.
  - O usuário poderá revisar e confirmar o plano antes de começar.

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

  Sua missão é garantir que o usuário tenha o melhor planejamento possivel para aprender o máximo sobre determinado assunto no período de 30 dias.
  
  Observações:
  - Evite fazer muitas perguntas em uma só mensagem (máximo 1 pergunta por mensagem).
  - Sempre que possível, faça perguntas abertas para obter mais informações do usuário.
  - Sempre gerar o plano através da tool 'createPlan'. Somente após execução desta tool que deverá ser informado ao usuário que a tool foi criada.
  `;

  const result = streamText({
    model: openai('gpt-4o-mini'),
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
      createPlan: tool({
        description: 'Cria um plano de metas e tarefas diárias para o usuário',
        parameters: z.object({
          objective: z.string().describe('The main objective of the plan'),
          description: z
            .string()
            .describe('Detailed description of the individual and their goal'),
          methodology: z.string().describe('How the plan will be executed'),
          planning: z.array(
            z.object({
              week: z.number().describe('The week number in the plan'),
              days: z.array(
                z.object({
                  day: z.number().describe('The day number of the week'),
                  tasks: z.array(
                    z.object({
                      name: z.string().describe('The name of the task'),
                      duration: z
                        .number()
                        .nullable()
                        .describe('The duration of the task in minutes'),
                    })
                  ),
                })
              ),
            })
          ),
        }),
        execute: async ({ objective, description, methodology, planning }) => {
          const plan = {
            objective,
            description,
            methodology,
            planning,
          };

          return plan;
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
