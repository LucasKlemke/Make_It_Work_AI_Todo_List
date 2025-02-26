'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Check } from 'lucide-react';
import { toast } from 'sonner';

const Tasks = ({
  tasks,
  handleCheck,
}: {
  tasks: { title: string; checked: boolean; date: Date; main_goal: string }[];
  handleCheck: (idx: number) => void;
}) => {
  return (
    <div className="bg-background rounded-3xl flex flex-col gap-y-1">
      <div className="flex border-b cursor-pointer justify-center font-bold text-xl gap-x-3 items-center  rounded-tr-3xl rounded-tl-3xl p-3 ">
        <p>Tarefas</p>
      </div>
      <ScrollArea className="h-60">
        {tasks.map((task, idx) => (
          <div
            onClick={() => handleCheck(idx)}
            key={`${idx}-task`}
            className="flex cursor-pointer gap-x-3 items-center hover:bg-slate-50  p-3 "
          >
            <Checkbox
              onClick={() => handleCheck(idx)}
              onCheckedChange={() => handleCheck(idx)}
              checked={task.checked}
              className="rounded-full"
            />
            <p>{task.title} |</p>
            <p>{`${task.date.getDate().toString().padStart(2, '0')}/${(task.date.getMonth() + 1).toString().padStart(2, '0')}/${task.date.getFullYear()}`}</p>
          </div>
        ))}
      </ScrollArea>
      <div className="flex justify-start w-full">
        <Button
          onClick={() => {
            toast(
              `${tasks.filter((t) => t.checked).length} tarefas concluídas`
            );
          }}
          className="w-full"
        >
          <Check /> Enviar
        </Button>
      </div>
    </div>
  );
};

export default Tasks;
