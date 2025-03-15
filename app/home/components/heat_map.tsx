import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Tasks } from '@/db/schema';

interface HeatMapProps {
  tasks: Tasks[];
}

const HeatMap: React.FC<HeatMapProps> = ({ tasks }) => {
  // 1. Simula a data de criação do usuário como "hoje - 1 ano"
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
  const daysToLastSunday = dayOfWeek === 0 ? 7 : dayOfWeek; // If today is Sunday, go back 7 days, otherwise go back to last Sunday

  const userCreatedAt = new Date();
  userCreatedAt.setDate(today.getDate() - daysToLastSunday);
  userCreatedAt.setHours(0, 0, 0, 0); // Reset to beginning of the day

  // 2. Calcula o índice do dia relativo a userCreatedAt
  const getDayIndex = (date: Date) => {
    const diff = date.getTime() - userCreatedAt.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  // Inicializa um array de 365 dias
  const checkedTasks = Array(365).fill(0);

  // 3. Itera por todas as tarefas e contabiliza as concluídas com base no completedAt
  tasks.forEach((task) => {
    if (task.completedAt) {
      const completedDate = new Date(task.completedAt);
      const dayIndex = getDayIndex(completedDate); // adding 1 day to the index
      if (dayIndex >= 0 && dayIndex < 365) {
        checkedTasks[dayIndex]++;
      }
    }
  });

  const getColor = (checkedCount: number) => {
    return checkedCount > 0 ? 'bg-green-500' : 'bg-white';
  };

  // 2. Função para obter a data correspondente a cada índice a partir de userCreatedAt
  const getDateFromIndex = (index: number) => {
    const date = new Date(userCreatedAt);
    date.setDate(date.getDate() + index);
    return date;
  };

  //  {Array.from({ length: 53 }).map((_, weekIndex) => (
  //           <div key={`week-${weekIndex}`} className="flex flex-col gap-1">
  //             {Array.from({ length: 7 }).map((_, dayIndex) => {
  //             const index = weekIndex * 7 + dayIndex;
  //             if (index >= 365) return null; // Skip if we exceed 365 days

  //             const color = getColor(checkedTasks[index]);
  //             const date = getDateFromIndex(index);

  //             return (
  //               <TooltipProvider delayDuration={50} key={index}>
  //               <Tooltip>
  //                 <TooltipTrigger asChild>
  //                 <div
  //                   className={`h-4 w-4 cursor-pointer border-[1px] border-slate-200 rounded-md ${color}`}
  //                 ></div>
  //                 </TooltipTrigger>
  //                 <TooltipContent>
  //                 <p>{date.toDateString()}</p>
  //                 <p>{checkedTasks[index]} tasks completed</p>
  //                 </TooltipContent>
  //               </Tooltip>
  //               </TooltipProvider>
  //             );
  //             })}

  return (
    <div className="grid grid-cols-6 gap-2">
      <div className="overflow-x-scroll bg-slate-200 rounded-xl p-4 col-span-4 md:col-span-5">
        <div className="grid w-[800px] grid-rows-7 grid-flow-col">
          {Array.from({ length: 365 }).map((_, index) => {
            const color = getColor(checkedTasks[index]);
            const date = getDateFromIndex(index);
            return (
              <TooltipProvider delayDuration={50} key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`h-4 w-4 cursor-pointer border-[1px] border-slate-200 rounded-md ${color}`}
                    ></div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{date.toDateString()}</p>
                    <p>{checkedTasks[index]} tasks completed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col overflow-y-scroll h-[200px] col-span-2 md:col-span-1 bg-slate-200 rounded-md p-2">
        <div className="md:text-base text-sm bg-primary text-primary-foreground w-full p-3 rounded-md border border-slate-200 gap-y-2 text-end">
          {userCreatedAt.getFullYear()} - {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
