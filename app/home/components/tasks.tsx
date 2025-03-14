'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tasks as TasksType } from '@/db/schema';
import { Check, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { seedDatabase } from './seed';

const Tasks = ({
  tasks,
  handleCheck,
}: {
  tasks: TasksType[];
  handleCheck: (idx: number) => void;
}) => {
  return (
    <div className="bg-background dark:bg-neutral-900  rounded-3xl flex flex-col gap-y-1">
      <div className="flex border-b  justify-center font-bold text-xl gap-x-3 items-center  rounded-tr-3xl rounded-tl-3xl p-3 ">
        <p>Tarefas do dia</p>
      </div>
      <ScrollArea className="h-60">
        {tasks.map((task, idx) => (
          <div
            onClick={() => handleCheck(idx)}
            key={`${idx}-task`}
            className="flex cursor-pointer gap-x-3 items-center hover:bg-slate-50 dark:hover:bg-neutral-800  p-3 "
          >
            <Checkbox
              onClick={() => handleCheck(idx)}
              onCheckedChange={() => handleCheck(idx)}
              checked={task.completedAt ? true : false}
              className="rounded-full"
            />
            <div>
              <p>{task.description}</p>
              <p className="text-xs">
                Duração:{' '}
                {task.duration < 60
                  ? `${task.duration} minutos`
                  : `${(task.duration / 60).toFixed(1)} horas`}
              </p>
            </div>

            {/* <p></p> */}
          </div>
        ))}
      </ScrollArea>
      <div className="flex justify-start w-full">
        <Button
          // onClick={() => {
          //   toast(
          //     `${tasks.filter((t) => t.checked).length} tarefas concluídas`
          //   );
          // }}
          className="w-full"
        >
          <Check /> Enviar
        </Button>
      </div>
    </div>
  );
};

export default Tasks;
