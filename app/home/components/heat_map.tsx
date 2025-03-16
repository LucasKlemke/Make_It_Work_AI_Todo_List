import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Tasks } from '@/db/schema';

interface HeatMapProps {
  tasks: Tasks[];
}

const HeatMap: React.FC<HeatMapProps> = ({ tasks }) => {
  // 1. Simula a data de criação do usuário como "hoje - 1 ano"
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 é domingo, 1 é segunda, etc.
  const daysToLastSunday = dayOfWeek === 0 ? 7 : dayOfWeek; // Se hoje é domingo, volta 7 dias, senão volta para o último domingo

  const userCreatedAt = new Date();
  userCreatedAt.setDate(today.getDate() - daysToLastSunday);
  userCreatedAt.setHours(0, 0, 0, 0); // Reseta para o início do dia

  // 2. Função para calcular o índice do dia relativo a userCreatedAt
  const getDayIndex = (date: Date) => {
    const diff = date.getTime() - userCreatedAt.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  // Inicializa um array de 365 dias para tarefas concluídas
  const checkedTasks = Array(365).fill(0);

  // Inicializa um array de 365 dias para tarefas a completar (com base em taskDate)
  const upcomingTasks = Array(365).fill(0);

  // 3. Itera por todas as tarefas
  tasks.forEach((task) => {
    // Contabiliza as tarefas concluídas
    if (task.completedAt) {
      const completedDate = new Date(task.completedAt);
      const dayIndex = getDayIndex(completedDate);
      if (dayIndex >= 0 && dayIndex < 365) {
        checkedTasks[dayIndex]++;
      }
    }
    // Contabiliza as tarefas a completar (considera tasks com taskDate e que não foram concluídas)
    if (task.taskDate && !task.completedAt) {
      const taskDate = new Date(task.taskDate);
      const dayIndex = getDayIndex(taskDate);
      if (dayIndex >= 0 && dayIndex < 365) {
        upcomingTasks[dayIndex]++;
      }
    }
  });

  // 4. Determina qual dia tem o maior número de tarefas a completar
  const maxUpcomingCount = Math.max(...upcomingTasks);
  const maxUpcomingIndex = upcomingTasks.findIndex(
    (count) => count === maxUpcomingCount
  );

  // 5. Função para obter a data correspondente a cada índice a partir de userCreatedAt
  const getDateFromIndex = (index: number) => {
    const date = new Date(userCreatedAt);
    date.setDate(date.getDate() + index);
    return date;
  };

  // 6. Função para determinar o background de cada célula:
  // - Se todas as tarefas do dia foram concluídas, retorna verde.
  // - Se houver tarefas pendentes:
  //    - Se o dia é passado, retorna vermelho (indicando falha em concluir).
  //    - Caso contrário (hoje ou futuro), retorna cinza.
  // - Se não houver tarefas, retorna um cinza claro.
  const getCellStyle = (index: number) => {
    const date = getDateFromIndex(index);
    const cellDate = new Date(date);
    cellDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const total = checkedTasks[index] + upcomingTasks[index];
    if (total > 0) {
      if (checkedTasks[index] === total) {
        // Todas as tarefas concluídas
        return 'bg-green-500';
      } else {
        // Tarefas pendentes
        if (cellDate < currentDate) {
          return 'bg-red-200 dark:bg-red-400';
        } else {
          return 'bg-gray-400';
        }
      }
    } else {
      return 'bg-gray-200';
    }
  };

  return (
    <>
      <p className="text-xl font-light p-2">
        {
          tasks.filter((task) => {
            if (!task.completedAt) return false;
            const completedDate = new Date(task.completedAt);
            return completedDate.getFullYear() === new Date().getFullYear();
          }).length
        }{' '}
        tarefas concluídas este ano
      </p>
      <div className="grid grid-cols-6 gap-2">
        <div className="overflow-x-scroll shadow-md rounded-xl p-4 col-span-4 md:col-span-5">
          <div className="grid w-[800px] grid-rows-7 grid-flow-col">
            {Array.from({ length: 365 }).map((_, index) => {
              const date = getDateFromIndex(index);
              const cellStyle = getCellStyle(index);
              const isMaxUpcoming =
                index === maxUpcomingIndex && upcomingTasks[index] > 0;
              return (
                <TooltipProvider delayDuration={50} key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`h-4 w-4 cursor-pointer border-[1px] border-background dark:border-slate-900 
                          rounded-md ${cellStyle}`}
                      ></div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {
                          ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][
                            date.getDay()
                          ]
                        }{' '}
                        {date.getDate().toString().padStart(2, '0')}/
                        {(date.getMonth() + 1).toString().padStart(2, '0')}/
                        {date.getFullYear()}
                      </p>
                      <p>{checkedTasks[index]} tarefas concluídas</p>
                      {(() => {
                        const cellDate = new Date(date);
                        cellDate.setHours(0, 0, 0, 0);
                        const currentDate = new Date();
                        currentDate.setHours(0, 0, 0, 0);
                        if (
                          cellDate < currentDate &&
                          upcomingTasks[index] > 0
                        ) {
                          return (
                            <p className="text-destructive">
                              Você deixou de concluir {upcomingTasks[index]}{' '}
                              tarefa(s)
                            </p>
                          );
                        } else if (upcomingTasks[index] > 0) {
                          return (
                            <p>{upcomingTasks[index]} tarefas para completar</p>
                          );
                        }
                        return null;
                      })()}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col overflow-y-scroll h-[200px] col-span-2 md:col-span-1 shadow-md rounded-md p-2">
          <div className="md:text-base text-sm bg-primary text-primary-foreground w-full p-3 rounded-md border border-slate-200 gap-y-2 text-end">
            {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeatMap;
