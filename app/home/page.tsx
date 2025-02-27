'use client';
import { StaggeredFade } from '@/components/ui/staggered-fade';
import TasksBlock from './components/tasks_block';
import SettingsBlock from './components/settings_block';

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

        <SettingsBlock />
      </div>
    </div>
  );
}
