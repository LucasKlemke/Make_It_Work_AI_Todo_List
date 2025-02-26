'use client';
import { useState } from 'react';
import HeatMap from './heat_map';
import Tasks from './tasks';

const getRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const TasksBlock = () => {
  const [tasks, setTasks] = useState([
    {
      title: 'Acordar as 07:00',
      checked: false,
      date: new Date(),
      main_goal: 'Ser saúdavel',
    },
    {
      title: 'Exercitar-se por 1 hora',
      checked: false,
      date: getRandomDate(new Date(2024, 0, 1), new Date(2024, 3, 1)),
      main_goal: 'Ser saúdavel',
    },
    {
      title: 'Comer 2 frutas',
      checked: false,
      date: getRandomDate(new Date(2024, 0, 1), new Date(2024, 3, 1)),
      main_goal: 'Ser saúdavel',
    },
    {
      title: 'Beber 3 litros de água',
      checked: false,
      date: getRandomDate(new Date(2024, 0, 1), new Date(2024, 3, 1)),
      main_goal: 'Ser saúdavel',
    },
    {
      title: 'Dormir antes das 23:00',
      checked: false,
      date: getRandomDate(new Date(2024, 0, 1), new Date(2024, 3, 1)),
      main_goal: 'Ser saúdavel',
    },
  ]);

  const handleCheck = (index: number) => {
    setTasks((prev) =>
      prev.map((task, idx) =>
        idx === index ? { ...task, checked: !task.checked } : task
      )
    );
  };
  return (
    <div className="h-[600px] flex flex-col gap-y-2 justify-between rounded-3xl border-2 border-slate-400 shadow-md dark:shadow-none col-span-6 md:col-span-4 p-3">
      <Tasks handleCheck={handleCheck} tasks={tasks} />

      <div className="">
        <p className="text-xl font-bold">Seu progresso</p>
        <HeatMap tasks={tasks} />
      </div>
    </div>
  );
};

export default TasksBlock;
