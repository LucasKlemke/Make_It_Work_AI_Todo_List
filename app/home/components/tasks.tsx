'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tasks as TasksType } from '@/db/schema';
import { a } from 'framer-motion/dist/types.d-6pKw1mTI';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

const Tasks = ({
  tasks,
  handleSubmit,
}: {
  tasks: TasksType[];
  handleSubmit: (ids: number[]) => void;
}) => {
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);

  useEffect(() => {
    setAlreadyCompleted(tasks.every((task) => task.completedAt !== null));
  }, [tasks]);

  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);

  const handleCheck = (id: number) => {
    const newCheckedTasks = checkedTasks.includes(id)
      ? checkedTasks.filter((taskId) => taskId !== id)
      : [...checkedTasks, id];
    setCheckedTasks(newCheckedTasks);
  };

  return (
    <div className="bg-background dark:bg-neutral-900  rounded-3xl flex flex-col gap-y-1">
      <div className="flex border-b  justify-center font-bold text-xl gap-x-3 items-center  rounded-tr-3xl rounded-tl-3xl p-3 ">
        <p>Tarefas do dia</p>
      </div>
      {alreadyCompleted ? (
        <div className="flex h-60 justify-center items-center text-muted-foreground p-3">
          <div className="text-center">
            <p className="text-7xl    bg-gradient-to-r  text-transparent bg-clip-text from-blue-600 to-pink-400">
              Parabéns!
            </p>
            <p className="text-lg flex gap-x-2 items-center text-muted-foreground mt-2">
              <Check />
              Todas as suas tarefas foram concluídas.
            </p>
          </div>
        </div>
      ) : (
        <ScrollArea className="h-60">
          {tasks.map((task, idx) => {
            if (task.completedAt !== null) return null;
            return (
              <div
                onClick={() => handleCheck(task.id)}
                key={`${idx}-task`}
                className={`flex cursor-pointer gap-x-3 items-center hover:bg-slate-50 dark:hover:bg-neutral-800  p-3 ${checkedTasks.includes(task.id) && 'text-muted-foreground'} `}
              >
                <Checkbox
                  onClick={() => handleCheck(task.id)}
                  onCheckedChange={() => handleCheck(task.id)}
                  checked={checkedTasks.includes(task.id)}
                  className="rounded-full"
                />
                <div>
                  <p
                    className={`${checkedTasks.includes(task.id) ? 'line-through' : ''}`}
                  >
                    {task.description}
                  </p>
                  <p className="text-xs">
                    Duração:{' '}
                    {task.duration < 60
                      ? `${task.duration} minutos`
                      : `${(task.duration / 60).toFixed(1)} horas`}
                  </p>
                </div>
              </div>
            );
          })}
        </ScrollArea>
      )}

      {!alreadyCompleted && (
        <div className="flex justify-start w-full">
          <Button onClick={() => handleSubmit(checkedTasks)} className="w-full">
            <Check /> Enviar
          </Button>
        </div>
      )}
    </div>
  );
};

export default Tasks;
