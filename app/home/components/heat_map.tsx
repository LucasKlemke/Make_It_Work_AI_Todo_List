import React from 'react';

interface Task {
  title: string;
  date: Date;
}

interface HeatMapProps {
  tasks: Task[];
}

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const HeatMap: React.FC<HeatMapProps> = ({ tasks }) => {
  const startDate = new Date(new Date().getFullYear(), 0, 1);
  const endDate = new Date(new Date().getFullYear(), 11, 31);

  const getDayIndex = (date: Date) => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const taskCounts = Array(365).fill(0);
  tasks.forEach((task) => {
    const dayIndex = getDayIndex(new Date(task.date));
    taskCounts[dayIndex]++;
  });

  const getColor = (count: number) => {
    if (count === 0) return 'bg-white';
    if (count <= 1) return 'bg-green-100';
    if (count <= 2) return 'bg-green-200';
    if (count <= 3) return 'bg-green-300';
    if (count <= 4) return 'bg-green-400';
    return 'bg-green-500';
  };

  const getDateFromIndex = (index: number) => {
    const date = new Date(new Date().getFullYear(), 0, 1);
    date.setDate(date.getDate() + index);
    return date;
  };

  return (
    <div className="overflow-x-scroll bg-slate-200 rounded-xl p-4">
      <div className="grid w-[800px] grid-cols-53">
        {Array.from({ length: 365 }).map((_, index) => {
          const color = getColor(taskCounts[index]);
          const date = getDateFromIndex(index);
          return (
            <TooltipProvider delayDuration={50} key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`h-4 w-4 cursor-pointer  border-[1px] border-slate-200 rounded-md ${color}`}
                  ></div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{date.toDateString()}</p>
                  <p>{taskCounts[index]} tasks completed</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
};

export default HeatMap;
