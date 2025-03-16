'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tasks as TasksType } from '@/db/schema';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useReward } from 'react-rewards';

const Tasks = ({
  tasks,
  handleSubmit,
}: {
  tasks: TasksType[];
  handleSubmit: (ids: number[]) => void;
}) => {
  // Define a data de referência (hoje) com hora padronizada (03:00)
  const hoje = new Date();
  hoje.setHours(3, 0, 0, 0);

  // Computa as datas disponíveis a partir das tasks
  const availableDates = useMemo(() => {
    const setDates = new Set<number>();
    tasks.forEach((task) => {
      const date = new Date(task.taskDate);
      date.setHours(3, 0, 0, 0);
      setDates.add(date.getTime());
    });
    const datesArr = Array.from(setDates).map((time) => new Date(time));
    datesArr.sort((a, b) => a.getTime() - b.getTime());
    return datesArr;
  }, [tasks]);

  // Estado para a data selecionada:
  // se hoje estiver entre as datas disponíveis, inicia com hoje; senão, usa a primeira data disponível.
  const [selectedDate, setSelectedDate] = useState(() => {
    const found = availableDates.find(
      (date) => date.getTime() === hoje.getTime()
    );
    return found ? new Date(hoje) : availableDates[0] || new Date(hoje);
  });

  // Caso availableDates mude e a data selecionada não esteja mais disponível, atualiza-a.
  useEffect(() => {
    const exists = availableDates.some(
      (date) => date.getTime() === selectedDate.getTime()
    );
    if (!exists && availableDates.length > 0) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates, selectedDate]);

  // Estado para as tasks filtradas de acordo com a data selecionada
  const [dayTasks, setDayTasks] = useState<TasksType[]>([]);
  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);

  useEffect(() => {
    const dataSelecionada = new Date(selectedDate);
    dataSelecionada.setHours(3, 0, 0, 0);
    const filtradas = tasks.filter((task) => {
      const taskDate = new Date(task.taskDate);
      taskDate.setHours(3, 0, 0, 0);
      return taskDate.getTime() === dataSelecionada.getTime();
    });
    setDayTasks(filtradas);
    // Limpa as tasks marcadas ao mudar a data
    setCheckedTasks([]);
  }, [selectedDate, tasks]);

  // Verifica se a data selecionada é a data de hoje
  const isToday = selectedDate.getTime() === hoje.getTime();
  // Calcula se todas as tasks do dia estão concluídas (caso existam tasks)
  const alreadyCompleted =
    dayTasks.length > 0 && dayTasks.every((task) => task.completedAt !== null);

  const { reward } = useReward('rewardId', 'confetti');

  useEffect(() => {
    if (isToday && alreadyCompleted) {
      reward();
    }
  }, [alreadyCompleted, isToday, reward]);

  // Função para marcar/desmarcar uma task (só ativa se for o dia atual)
  const handleCheck = (id: number) => {
    if (!isToday) return;
    const newCheckedTasks = checkedTasks.includes(id)
      ? checkedTasks.filter((taskId) => taskId !== id)
      : [...checkedTasks, id];
    setCheckedTasks(newCheckedTasks);
  };

  // Formata a data selecionada para exibição
  const formattedSelectedDate = selectedDate
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
    );

  // Obtém o índice da data selecionada dentro do array de datas disponíveis
  const currentIndex = availableDates.findIndex(
    (date) => date.getTime() === selectedDate.getTime()
  );

  return (
    <div className="bg-background dark:bg-neutral-900 rounded-3xl flex flex-col gap-y-1">
      {/* Cabeçalho de navegação entre datas */}
      <div className="flex border-b items-center justify-between gap-x-3 rounded-tr-3xl rounded-tl-3xl p-3">
        <ChevronLeft
          className={`cursor-pointer ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => {
            if (currentIndex > 0) {
              setSelectedDate(availableDates[currentIndex - 1]);
            }
          }}
        />
        <div className="text-center">
          {isToday && <p className="text-xl ">Hoje</p>}
          <p
            className={`font-bold ${isToday ? 'text-sm text-muted-foreground"' : 'text-xl'}`}
          >
            {formattedSelectedDate}
          </p>
        </div>
        <ChevronRight
          className={`cursor-pointer ${
            currentIndex === availableDates.length - 1
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
          onClick={() => {
            if (currentIndex < availableDates.length - 1) {
              setSelectedDate(availableDates[currentIndex + 1]);
            }
          }}
        />
      </div>

      {/* Renderização das tasks */}
      {isToday && alreadyCompleted ? (
        <div>
          <div className="relative h-60">
            <div className="text-center absolute inset-0 z-50 backdrop-blur-md flex flex-col justify-center">
              <span id="rewardId" />
              <p className="text-7xl bg-gradient-to-r text-transparent bg-clip-text from-blue-600 to-pink-400">
                Parabéns!
              </p>
              <p className="text-lg flex gap-x-2 justify-center items-center text-muted-foreground mt-2">
                <Check />
                Todas as suas tarefas do dia atual foram concluídas.
              </p>
            </div>
            <ScrollArea className="h-60">
              {dayTasks.map((task, idx) => (
                <div
                  key={`${idx}-task`}
                  className="flex gap-x-3 text-muted-foreground items-center p-3"
                >
                  <Checkbox checked={true} className="rounded-full" />
                  <div>
                    <p className="line-through">{task.description}</p>
                    <p className="text-xs">
                      Duração:{' '}
                      {task.duration < 60
                        ? `${task.duration} minutos`
                        : `${(task.duration / 60).toFixed(1)} horas`}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      ) : (
        <ScrollArea className="h-60">
          {dayTasks.map((task, idx) => {
            if (isToday && task.completedAt !== null) return null;
            return (
              <div
                onClick={() => handleCheck(task.id)}
                key={`${idx}-task`}
                className={`flex ${
                  isToday ? 'cursor-pointer' : ''
                } gap-x-3 items-center hover:bg-slate-50 dark:hover:bg-neutral-800 p-3 ${
                  checkedTasks.includes(task.id) ? 'text-muted-foreground' : ''
                }`}
              >
                <Checkbox
                  disabled={!isToday}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheck(task.id);
                  }}
                  onCheckedChange={() => handleCheck(task.id)}
                  checked={checkedTasks.includes(task.id)}
                  className="rounded-full"
                />
                <div>
                  <p
                    className={`${
                      checkedTasks.includes(task.id) ? 'line-through' : ''
                    }`}
                  >
                    {task.description}
                  </p>
                  <p className="text-xs">
                    Duração:{' '}
                    {task.duration < 60
                      ? `${task.duration} minutos`
                      : `${(task.duration / 60).toFixed(1)} horas`}
                  </p>
                </div>
              </div>
            );
          })}
        </ScrollArea>
      )}

      {/* Botão de envio só aparece se for hoje e houver tasks pendentes */}
      {isToday && !alreadyCompleted && (
        <div className="flex justify-start w-full">
          <Button
            onClick={() => {
              handleSubmit(checkedTasks);
            }}
            className="w-full"
          >
            <Check /> Enviar
          </Button>
        </div>
      )}
    </div>
  );
};

export default Tasks;
