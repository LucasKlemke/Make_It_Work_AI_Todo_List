'use client';
import { useEffect, useState } from 'react';
import HeatMap from './heat_map';
import Tasks from './tasks';
import { getTodayTask } from '@/lib/get_today_task';
import { Tasks as TasksType } from '@/db/schema';

const getRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const TasksBlock = ({ goal }) => {
  const [tasks, setTasks] = useState<TasksType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await getTodayTask(goal.id, new Date()).then((tasks) => setTasks(tasks));
    };
    fetchData();
  }, []);

  return (
    <div className="h-[600px] flex flex-col gap-y-2 justify-between rounded-3xl border dark:bg-neutral-900  dark:border-slate-400 shadow-lg dark:shadow-none col-span-6 md:col-span-4 p-3">
      {tasks && tasks.length > 0 && (
        <Tasks handleCheck={() => alert('Not implemented yet')} tasks={tasks} />
      )}

      <div className="">
        <p className="text-xl font-bold" onClick={() => console.log(tasks)}>
          Seu progresso
        </p>
        {/* <HeatMap tasks={tasks} /> */}
      </div>
    </div>
  );
};

export default TasksBlock;
