'use client';
import HeatMap from './heat_map';
import Tasks from './tasks';


const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const tasks = Array.from({ length: 100 }, (_, index) => ({
  title: `Task ${index + 1}`,
  checked: false,
  date: getRandomDate(new Date(2023, 0, 1), new Date()),
  main_goal: 'Ser saúdavel',
}));

const TasksBlock = () => {
  return (
    <div className="h-[600px] flex flex-col gap-y-2 justify-between rounded-3xl border-2 border-slate-400 shadow-md dark:shadow-none col-span-6 md:col-span-4 p-3">
      <Tasks />

      <div className="">
        <p className="text-xl font-bold">Seu progresso</p>
        <HeatMap tasks={tasks} />
      </div>
    </div>
  );
};

export default TasksBlock;
