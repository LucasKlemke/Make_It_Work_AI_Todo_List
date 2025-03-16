import React, { useEffect, useState } from 'react';
import TasksBlock from './tasks_block';
import SettingsBlock from './settings_block';
import { Goals, Tasks as TasksType } from '@/db/schema';
import { Skeleton } from '@/components/ui/skeleton';

const HomeContent = ({ goals }: { goals: Goals[] }) => {
  const [tasks, setTasks] = useState<TasksType[] | null>(null);
  const [currentGoal, setCurrentGoal] = useState<Goals | null>(null);

  useEffect(() => {
    if (goals && goals.length > 0) {
      // Procura o goal mais recente, filtrando por data de criação
      const mostRecentGoal = goals.reduce(
        (latest, goal) => (goal.createdAt > latest.createdAt ? goal : latest),
        goals[0]
      );

      // Define o goal mais recente como o goal atual
      setCurrentGoal(mostRecentGoal);
    }
  }, [goals]);

  useEffect(() => {
    const fetchData = async (currentGoal: Goals) => {
      // await getTodayTask(goal.id, new Date()).then((tasks) => setTasks(tasks));
      await fetch(`/api/goals/${currentGoal.id}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => setTasks(data));
    };

    if (currentGoal) fetchData(currentGoal);
  }, [currentGoal]);

  if (currentGoal && tasks) {
    return (
      <div className="grid grid-cols-6 w-full gap-3">
        <TasksBlock tasks={tasks} setTasks={setTasks} />
        <SettingsBlock goal={currentGoal} tasks={tasks} setTasks={setTasks} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-6 w-full gap-3">
      <Skeleton className="min-h-[600px]  col-span-6 rounded-3xl lg:col-span-4" />
      <Skeleton className="col-span-6 lg:col-span-2 rounded-3xl min-h-[400px] lg:h-full" />
    </div>
  );
};

export default HomeContent;
