import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import { ThemeSwitcher } from '@/components/theme-switcher';

const PlanBlock = ({
  plan,
  onClose,
}: {
  plan: {
    userId: string;
    objective: string;
    description: string;
    methodology: string;
    planning: {
      week: number;
      days: {
        day: number;
        tasks: {
          name: string;
          duration: number | null;
        }[];
      }[];
    }[];
  };
  onClose: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const handleCreatePlan = async () => {
    setIsLoading(true);
    console.log(session?.user);
    const userId = await session?.user?.id;

    try {
      await fetch('/api/goals', {
        method: 'POST',
        body: JSON.stringify({
          // @ts-ignore
          userId,
          ...plan,
        }),
      });
      toast('Plano criado com sucesso');
    } catch (error) {
      toast('Erro ao criar plano');
      // @ts-ignore
      toast(error.message);
      console.error(error);
    }

    setIsLoading(false);
    onClose();
  };

  return (
    <div className=" shadow-md rounded-xl  dark:border col-span-2 lg:col-span-1 order-1 lg:order-2">
      <ScrollArea className="h-[35vh] lg:h-[65vh] p-3  flex flex-col">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center w-full justify-between">
              <div className="flex gap-x-3">
                <p className=" text-2xl md:text-4xl bg-gradient-to-r inline-block text-transparent bg-clip-text from-blue-600 to-pink-400">
                  Make it Work
                </p>
                <Image
                  src={'/logo_to_do.png'}
                  width={30}
                  height={30}
                  alt={'xxx'}
                />
              </div>

              <ThemeSwitcher />
            </div>
            <div className="flex flex-col gap-2">
              <p>
                <span className="font-semibold text-lg">Objetivo:{` `}</span>
                {plan.objective}
              </p>
              <p>
                <span className="font-semibold text-lg">Descrição:{` `}</span>
                {plan.description}
              </p>
              <p>
                <span className=" text-lg font-semibold">
                  Metodologia:{` `}
                </span>
                {plan.methodology}
              </p>
            </div>
          </div>

          <div>
            <span className="font-semibold text-lg">Planejamento:{` `}</span>
            {plan.planning.map((weekPlan, i) => (
              <Accordion key={i} type="single" collapsible>
                <AccordionItem value={`week-${i + 1}`}>
                  <AccordionTrigger>Semana {i + 1}</AccordionTrigger>
                  <AccordionContent className="pl-5">
                    {weekPlan.days.map((dayPlan, j) => (
                      <div key={j} className="mb-4">
                        <Accordion key={j} type="single" collapsible>
                          <AccordionItem value={`day-${j + 1}`}>
                            <AccordionTrigger>Dia {j + 1}</AccordionTrigger>
                            <AccordionContent className="pl-5">
                              {dayPlan.tasks.map((task, k) => (
                                <div key={k} className="ml-4 mb-2">
                                  <p className="font-semibold">{task.name}</p>
                                  {task.duration && (
                                    <p>
                                      Duração:{' '}
                                      {task.duration < 60
                                        ? `${task.duration} minutos`
                                        : `${(task.duration / 60).toFixed(1)} horas`}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className="p-3 w-full">
        <Button
          onClick={handleCreatePlan}
          disabled={isLoading}
          className="w-full"
        >
          Confirmar
          {isLoading ? <Loader2 className="animate-spin" /> : <Check />}
        </Button>
      </div>
    </div>
  );
};

export default PlanBlock;
