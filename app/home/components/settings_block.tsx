'use client';
import { Ban, Hourglass, Trophy, User } from 'lucide-react';
import React from 'react';
import SignOutButton from '../sign-out-button';
import { useSession } from 'next-auth/react';

import { Card } from '@/components/ui/card';
import { Goals, Tasks as TasksType } from '@/db/schema';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useGoalStore } from '@/lib/goal_store';
import { useShallow } from 'zustand/shallow';

const frasesMotivacionais = [
  'A consistência é a chave para transformar sonhos em realidade.',
  'Grandes conquistas começam com pequenos passos consistentes.',
  'A consistência é o que separa os sonhadores dos realizadores.',
  'Não se trata de ser perfeito, mas de ser consistente.',
  'O segredo do sucesso está na consistência das suas ações diárias.',
  'A perseverança diária constrói os alicerces do sucesso.',
  'Consistência vence talento quando o talento não é consistente.',
  'Não desista. O progresso vem com a consistência, não com a velocidade.',
  'O caminho para o sucesso é feito de pequenos hábitos consistentes.',
  'A consistência é o que torna os sonhos sustentáveis.',
  'O sucesso não vem da intensidade, mas da consistência.',
  'O que você faz consistentemente, eventualmente vai gerar resultados.',
  'O progresso acontece todos os dias, não apenas nos dias bons.',
  'Os resultados vêm da persistência, não da pressa.',
  'O segredo do sucesso é simples: ação consistente.',
  'Consistência constrói o caminho, mesmo quando a motivação vacila.',
  'A consistência é mais importante do que a velocidade.',
  'O que começa pequeno, mas é consistente, cresce de maneira exponencial.',
  'Se você quer mudar sua vida, seja consistente nas suas ações.',
  'Não deixe que a falta de motivação te impeça de ser consistente.',
  'O sucesso é uma jornada de passos consistentes, não de saltos esporádicos.',
  'A consistência é a força invisível que mantém o progresso em movimento.',
  'A grandeza não vem do esforço esporádico, mas da dedicação constante.',
  'Pequenos progressos diários somam grandes mudanças ao longo do tempo.',
  'A verdadeira mudança vem com a consistência, não com grandes gestos.',
  'O caminho para o sucesso é pavimentado com ações pequenas, mas consistentes.',
  'Sem consistência, os sonhos permanecem no campo das intenções.',
  'A disciplina e a consistência são os maiores aliados do sucesso.',
  'A chave para alcançar seus objetivos é ser consistente, não perfeccionista.',
  'A consistência é mais poderosa que a inspiração passageira.',
  'A mágica acontece quando você é consistente em seguir o caminho.',
  'Cada pequeno passo consistente te aproxima de onde você quer estar.',
  'Consistência é o que transforma esforço em conquista.',
  'A consistência é a ponte entre os seus sonhos e as suas realizações.',
  'Não se trata do quanto você faz, mas de quanto você faz de forma consistente.',
  'Consistência é o ingrediente secreto para conquistar qualquer coisa.',
  'O sucesso é um reflexo direto da sua capacidade de ser consistente.',
  'Não existe progresso sem consistência.',
  'Quando você é consistente, o impossível se torna possível.',
  'A consistência é o que transforma o ordinário em extraordinário.',
  'É a consistência que transforma a força de vontade em resultados duradouros.',
  'A chave para alcançar seus sonhos está em como você faz o que faz de forma consistente.',
  'O sucesso diário é mais importante do que o sucesso de um único dia.',
  'A prática constante cria um futuro de resultados sólidos.',
  'Grandes coisas são alcançadas através da consistência, não da sorte.',
  'A única maneira de alcançar grandes resultados é ser consistente em tudo o que faz.',
  'A consistência é a prova de que você está comprometido com o seu objetivo.',
  'Com consistência, até os maiores obstáculos se tornam vencíveis.',
  'O sucesso é construído um passo de cada vez, e cada passo deve ser consistente.',
  'Pequenos hábitos consistentes são mais poderosos do que grandes esforços esporádicos.',
  'Não desanime pela lentidão, o progresso constante vale mais do que o progresso rápido.',
  'A consistência é o combustível que transforma o desejo em realidade.',
  'Seja consistente, pois é a consistência que transforma sua visão em sucesso.',
  'Grandes vitórias começam com ações simples e consistentes.',
  'Você é capaz de fazer mais do que imagina quando mantém a consistência.',
];

const SettingsBlock = ({
  tasks,
  setGoals,
  setTasks,
}: {
  tasks: TasksType[];
  setTasks: React.Dispatch<
    React.SetStateAction<
      | {
          id: number;
          createdAt: Date;
          description: string;
          monthlyGoalId: number;
          taskDate: Date;
          duration: number;
          completedAt: Date | null;
        }[]
      | null
    >
  >;
}) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = React.useState(false);
  const { removeGoal, currentGoal, } = useGoalStore(
    useShallow((state) => ({
      removeGoal: state.removeGoal,
      currentGoal: state.currentGoal,
    }))
  );

  const handleDeleteGoal = async () => {
    try {
      setIsLoading(true);
      await removeGoal(currentGoal?.id);
      toast.success('Objetivo deletado com sucesso');
    } catch (error) {
      toast.error('Erro ao deletar objetivo');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="col-span-6 md:col-span-6 lg:col-span-2 h-full">
        <div className="w-full rounded-3xl h-full dark:bg-gradient-to-r from-blue-600 to-pink-400 p-[1px]">
          <div className=" bg-background h-full flex flex-col gap-y-2 justify-between rounded-3xl border dark:bg-neutral-900 dark:shadow-pink-400    shadow-lg  col-span-6 md:col-span-4 p-5">
            <div className="flex gap-x-2 flex-col md:flex-row">
              <div className="flex flex-col w-full gap-y-2 sm:col-span-4 lg:col-span-3">
                <div className="flex border-b cursor-pointer justify-center font-bold text-xl gap-x-3 items-center  rounded-tr-3xl rounded-tl-3xl p-3 ">
                  <p>Usuário</p>
                </div>

                <div className="flex flex-col gap-y-1 pb-4">
                  <div className="flex gap-x-1 items-center">
                    <User size={15} />
                    <p className="text-sm">Nome:</p>
                    <p className="text-sm">{session?.user?.name}</p>
                  </div>
                  <div className="my-4 shadow-md dark:bg-gradient-to-r from-blue-600 dark:shadow-pink-400  to-pink-400 rounded-3xl p-[1px]">
                    <div className="bg-background dark:bg-neutral-900 rounded-3xl p-4">
                      <div className="flex dark:text-yellow-300 text-yellow-500 gap-x-1 items-center ">
                        <Trophy size={15} />
                        <p className="text-sm">Objetivo:</p>
                      </div>
                      <p className="text-xl font-extralight">
                        {currentGoal.objective}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-semibold pb-2">Tarefas</p>
                  {isLoading ? (
                    <div className="grid grid-cols-3 gap-2">
                      <Card className="col-span-1  flex flex-col w-full h-full justify-center items-center">
                        <p className="text-lg">Concluídas</p>
                        {/* <div className="flex p-3 flex-col">
                      <p className="text-3xl">20</p>
                    </div> */}
                      </Card>
                      <Card className="col-span-1  flex flex-col w-full h-full justify-center items-center">
                        <p className="text-lg">Restantes</p>
                        {/* <div className="flex p-3 flex-col">
                      <p className="text-3xl">20</p>
                    </div> */}
                      </Card>
                      <Card className="col-span-1  flex flex-col w-full h-full justify-center items-center">
                        <p className="text-lg">Progresso</p>
                        {/* <div className="flex p-3 flex-col">
                      <p className="text-3xl">50%</p>
                    </div> */}
                      </Card>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      <Card className="col-span-1  flex flex-col w-full h-full justify-center items-center bg-emerald-200 dark:bg-emerald-800">
                        <p className="text-lg">Concluídas</p>
                        <div
                          onClick={() => console.log(tasks)}
                          className="flex p-3 flex-col"
                        >
                          <p className="text-3xl">
                            {tasks?.filter((task) => task.completedAt).length}
                          </p>
                        </div>
                      </Card>
                      <Card className="col-span-1  flex flex-col w-full h-full justify-center items-center bg-blue-200 dark:bg-blue-800">
                        <p className="text-lg">Restantes</p>
                        <div className="flex p-3 flex-col">
                          <p className="text-3xl">
                            {
                              tasks?.filter((task) => task.completedAt === null)
                                .length
                            }
                          </p>
                        </div>
                      </Card>
                      <Card
                        className={`col-span-1  flex flex-col w-full h-full justify-center items-center bg-pink-200 dark:bg-pink-800`}
                      >
                        <p className="text-lg">Progresso</p>
                        <div className="flex p-3 flex-col">
                          <p className="text-3xl">
                            {tasks
                              ? `${Math.round((tasks.filter((task) => task.completedAt).length / tasks.length) * 100)}%`
                              : '0%'}
                          </p>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
                <div className="border p-4 rounded-3xl">
                  <div className="flex flex-col gap-y-2">
                    {(() => {
                      // Select a random phrase from the array
                      const randomIndex = Math.floor(
                        Math.random() * frasesMotivacionais.length
                      );
                      const randomFrase = frasesMotivacionais[randomIndex];

                      return (
                        <div className="flex flex-col gap-y-1">
                          <p className="text-base italic">"{randomFrase}"</p>
                        </div>
                      );
                    })()}
                  </div>
                </div>
                <div className="flex h-full pt-10 justify-end md:gap-y-2 gap-x-2">
                  <Button
                    onClick={() => handleDeleteGoal()}
                    variant="destructive"
                  >
                    <Ban /> Abandonar objetivo
                  </Button>
                  <SignOutButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsBlock;
