'use client';
import { StaggeredFade } from '@/components/ui/staggered-fade';
import TasksBlock from './components/tasks_block';




export default function page() {
  return (
    <div className="w-full">
      <div className="pb-4">
        <StaggeredFade
          text="Segunda Feira, 24 de Fevereiro de 2025"
          className="text-3xl"
        />
      </div>

      <div className="grid grid-cols-6 w-full gap-3">
        <TasksBlock />

        <div className="col-span-6 md:col-span-2 rounded-3xl h-full  border-2 z-30 shadow-md dark:shadow-none border-slate-400"></div>

        <div className="h-52  bg-background border-2 shadow-md dark:shadow-none border-slate-400 flex flex-col gap-y-3 col-span-6 rounded-3xl py-5 p-3"></div>
      </div>
    </div>
  );
}
