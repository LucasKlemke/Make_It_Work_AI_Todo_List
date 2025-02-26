import React from 'react';

interface HeatMapProps {
  tasks: { title: string; checked: boolean; date: Date; main_goal: string }[];
}

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const HeatMap: React.FC<HeatMapProps> = ({ tasks }) => {
  const getDayIndex = (date: Date) => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const checkedTasks = Array(365).fill(0);
  tasks.forEach((task) => {
    const dayIndex = getDayIndex(new Date(task.date));
    if (task.checked) {
      checkedTasks[dayIndex]++;
    }
  });

  const getColor = (checkedCount: number) => {
    return checkedCount > 0 ? 'bg-green-500' : 'bg-white';
  };

  const getDateFromIndex = (index: number) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return date;
  };

  return (
    <div className="grid grid-cols-6 gap-2">
      <div className="overflow-x-scroll bg-slate-200 rounded-xl p-4 col-span-4 md:col-span-5">
        <div className="grid w-[800px] grid-cols-53">
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
          2025
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
