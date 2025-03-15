'use client';
import { useEffect, useState } from 'react';
import HeatMap from './heat_map';
import Tasks from './tasks';
import { getTodayTask, updateTaskDay } from '@/lib/get_today_task';
import { Goals, Tasks as TasksType } from '@/db/schema';

const TasksBlock = ({ goal }: { goal: Goals }) => {
  const [tasks, setTasks] = useState<TasksType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // await getTodayTask(goal.id, new Date()).then((tasks) => setTasks(tasks));
      await fetch(`/api/goals/${goal.id}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => setTasks(data));
    };
    fetchData();
  }, []);

  const handleSubmit = (tasksIds: number[]) => {
    tasksIds.forEach((taskId) => {
      updateTaskDay(taskId, new Date());
    });

    setTasks((prevTasks) => {
      return prevTasks?.map((task) => {
        if (tasksIds.includes(task.id)) {
          return { ...task, completedAt: new Date() };
        }
        return task;
      });
    });
  };

  return (
    <div
      onClick={() => console.log()}
      className="min-h-[600px] bg-background flex flex-col gap-y-2 justify-between rounded-3xl border dark:bg-neutral-900  dark:border-slate-400 shadow-lg dark:shadow-none col-span-6 md:col-span-4 p-5"
    >
      {tasks && tasks.length > 0 && (
        <Tasks
          handleSubmit={handleSubmit}
          tasks={tasks.filter((task) => {
            const today = new Date();
            const formatedDate = new Date(today);
            formatedDate.setHours(3, 0, 0, 0);
            // Convert task.taskDate to a Date object if it's a string
            const taskDate = new Date(task.taskDate);

            // Set hours to 3:00:00 for consistent comparison
            taskDate.setHours(3, 0, 0, 0);

            // Compare the timestamps for value equality
            return taskDate.getTime() === formatedDate.getTime();
          })}
        />
      )}

      <div className="">
        {tasks && tasks.length > 0 && <HeatMap tasks={tasks} />}
      </div>
    </div>
  );
};

export default TasksBlock;
