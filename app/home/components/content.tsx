import React, { useEffect, useState } from 'react';
import TasksBlock from './tasks_block';
import SettingsBlock from './settings_block';
import { Goals, Tasks as TasksType } from '@/db/schema';
import { Skeleton } from '@/components/ui/skeleton';
import { useGoalStore } from '@/lib/goal_store';
import { useShallow } from 'zustand/shallow';

const HomeContent = () => {
  const [tasks, setTasks] = useState<TasksType[] | null>(null);
  const { goals, setGoals, currentGoal, setCurrentGoal } = useGoalStore(
    useShallow((state) => ({
      goals: state.goals,
      setGoals: state.setGoals,
      currentGoal: state.currentGoal,
      setCurrentGoal: state.setCurrentGoal,
    }))
  );

  useEffect(() => {
    if (goals && goals.length > 0) {

      // Define o goal mais recente como o goal atual
      setCurrentGoal(goals[0]);
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
        <SettingsBlock tasks={tasks} setTasks={setTasks} />
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
