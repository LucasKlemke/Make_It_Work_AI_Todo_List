'use client';
import HeatMap from './heat_map';
import Tasks from './tasks';
import { updateTaskDay } from '@/lib/get_today_task';
import { Tasks as TasksType } from '@/db/schema';

const TasksBlock = ({
  tasks,
  setTasks,
}: {
  tasks: TasksType[];
  setTasks: React.Dispatch<
    React.SetStateAction<
      | {
          id: number;
          createdAt: Date;
          description: string;
          monthlyGoalId: number;
          taskDate: Date;
          duration: number;
          completedAt: Date | null;
        }[]
      | null
    >
  >;
}) => {
  const handleSubmit = (tasksIds: number[]) => {
    tasksIds.forEach((taskId) => {
      updateTaskDay(taskId, new Date());
    });

    setTasks((prevTasks) => {
      if (!prevTasks) return null;
      return prevTasks.map((task) => {
        if (tasksIds.includes(task.id)) {
          return { ...task, completedAt: new Date() };
        }
        return task;
      });
    });
  };

  return (
    <div className="col-span-6 lg:col-span-4 min-h-[600px]">
      <div className="w-full rounded-3xl dark:bg-gradient-to-r from-blue-600 to-pink-400 p-[1px]">
        <div className=" bg-background flex flex-col gap-y-2 justify-between rounded-3xl border dark:bg-neutral-900 dark:shadow-pink-400    shadow-lg  col-span-6 md:col-span-4 p-5">
          {tasks && tasks.length > 0 && (
            <Tasks handleSubmit={handleSubmit} tasks={tasks} />
          )}

          <div className="">
            {tasks && tasks.length > 0 && <HeatMap tasks={tasks} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksBlock;
