'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Check } from 'lucide-react';

const tasks = [
  {
    title: 'Acordar as 07:00',
    checked: false,
    date: new Date(),
    main_goal: 'Ser saúdavel',
  },
  {
    title: 'Exercitar-se por 1 hora',
    checked: false,
    date: new Date(),
    main_goal: 'Ser saúdavel',
  },
  {
    title: 'Comer 2 frutas',
    checked: false,
    date: new Date(),
    main_goal: 'Ser saúdavel',
  },
  {
    title: 'Beber 3 litros de água',
    checked: false,
    date: new Date(),
    main_goal: 'Ser saúdavel',
  },
  {
    title: 'Dormir antes das 23:00',
    checked: false,
    date: new Date(),
    main_goal: 'Ser saúdavel',
  },
];

const Tasks = () => {
  return (
    <div className="bg-background rounded-3xl flex flex-col gap-y-1">
      <div className="flex border-b cursor-pointer justify-center font-bold text-xl gap-x-3 items-center  rounded-tr-3xl rounded-tl-3xl p-3 ">
        <p>Tarefas</p>
      </div>
      <ScrollArea className="h-60">
        {tasks.map((task) => (
          <div className="flex cursor-pointer gap-x-3 items-center hover:bg-slate-50 rounded-tr-3xl rounded-tl-3xl p-3 ">
            <Checkbox checked={task.checked} className="rounded-full" />
            <p>{task.title}</p>
          </div>
        ))}
      </ScrollArea>
      <div className="flex justify-start w-full">
        {' '}
        <Button>
          <Check /> Enviar
        </Button>
      </div>
    </div>
  );
};

export default Tasks;
