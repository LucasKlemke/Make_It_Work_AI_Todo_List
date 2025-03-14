'use client';
import { StaggeredFade } from '@/components/ui/staggered-fade';
import TasksBlock from './components/tasks_block';
import SettingsBlock from './components/settings_block';
import { auth } from '../auth';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getCurrentGoal } from '@/lib/get_today_task';
import { set } from 'zod';
import { ChatDialog } from './components/chat-dialog';

export default function page() {
  const { data: session } = useSession();
  const [goal, setGoal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getGoal = async () => {
      await getCurrentGoal(session?.user?.id).then((goal) => {
        setGoal(goal[0]);
        if (!goal || goal.length === 0) {
          setIsModalOpen(true);
        }
      });
    };

    getGoal();
  }, [session, isModalOpen]);

  return (
    <div className="w-full">
      <div className="pb-4">
        <StaggeredFade
          text={new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
          }).replace(/^\w/, (c) => c.toUpperCase())
        .replace(/ de ([a-z])/, (match, p1) => ` de ${isNaN(p1) ? p1.toUpperCase() : p1}`)}
          className="text-3xl"
        />
      </div>

      {goal && (
        <div className="grid grid-cols-6 w-full gap-3">
          <TasksBlock goal={goal} />
          <SettingsBlock goal={goal} />
        </div>
      )}
      {isModalOpen && (
        <ChatDialog open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
