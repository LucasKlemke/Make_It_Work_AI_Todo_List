'use client';
import { StaggeredFade } from '@/components/ui/staggered-fade';
import TasksBlock from './components/tasks_block';
import SettingsBlock from './components/settings_block';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ChatDialog } from './components/chat-dialog';
import { toast } from 'sonner';
import { Goals } from '@/db/schema';
import { Content } from 'next/font/google';
import HomeContent from './components/content';

export default function page() {
  const { data: session } = useSession();
  const [goals, setGoals] = useState<Goals[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getGoal = async () => {
      if (!session?.user?.id) return;
      try {
        const userId = encodeURIComponent(session?.user?.id);
        const res = await fetch(`/api/users/${userId}/goals`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Erro ao recuperar goal');
        }
        const data = await res.json();
        setGoals(data);
        if (!data || data.length === 0) {
          setIsModalOpen(true);
        }
      } catch (error) {
        setGoals(null);
        toast.error('Erro ao recuperar goal');
      }
    };

    getGoal();
  }, [session, isModalOpen]);

  return (
    <div className="w-full">
      <div className="pb-4">
        <StaggeredFade
          text={new Date()
            .toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
            .replace(/^\w/, (c) => c.toUpperCase())
            .replace(
              / de ([a-z])/,
              (match, p1) => ` de ${isNaN(p1) ? p1.toUpperCase() : p1}`
            )}
          className="text-lg md:text-3xl"
        />
      </div>

      <HomeContent goals={goals || []} />

      {isModalOpen && (
        <ChatDialog open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
