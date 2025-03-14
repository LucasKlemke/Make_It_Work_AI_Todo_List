'use client';
import { Button } from '@/components/ui/button';
import { Hourglass, Settings, Target, User, UserPen } from 'lucide-react';
import React from 'react';
import SignOutButton from '../sign-out-button';
import { useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChatDialog } from './chat-dialog';
import { Card } from '@/components/ui/card';

const SettingsBlock = ({ goal }) => {
  const { data: session } = useSession();

  return (
    <>
      <div className="col-span-6 md:col-span-2 rounded-3xl h-full border dark:bg-neutral-900  z-30 shadow-lg dark:shadow-none dark:border-slate-400 p-4">
        <div className="flex gap-x-2 flex-col md:flex-row">
          <div className="flex flex-col w-full gap-y-2 sm:col-span-4 lg:col-span-3">
            <div className="flex border-b cursor-pointer justify-center font-bold text-xl gap-x-3 items-center  rounded-tr-3xl rounded-tl-3xl p-3 ">
              <p>Usuário</p>
            </div>

            <div className="flex flex-col gap-y-1 pb-4">
              <div className="flex gap-x-1 items-center">
                <User size={15} />
                <p className="text-sm">Nome:</p>
                <p className="text-sm">{session?.user?.name}</p>
              </div>
              <div>
                <div className="flex gap-x-1 items-center">
                  <Hourglass size={15} />
                  <p className="text-sm">Meta:</p>
                </div>
                <p className="text-xl font-semibold">{goal.objective}</p>
              </div>
            </div>
            <div className="flex md:flex-col lg:flex-row md:gap-y-2 gap-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button>
                    <Settings />
                    Configurações
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserPen /> Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Target />
                    Metas
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <SignOutButton />
            </div>
            <div>
              <p className="font-semibold pb-2">Tarefas</p>
              <div className="grid grid-cols-3 gap-2">
                <Card className="col-span-1  flex flex-col w-full h-full justify-center items-center">
                  <p className="text-lg">Concluídas</p>
                  <div className="flex p-3 flex-col">
                    <p className="text-3xl">20</p>
                  </div>
                </Card>
                <Card className="col-span-1  flex flex-col w-full h-full justify-center items-center">
                  <p className="text-lg">Restantes</p>
                  <div className="flex p-3 flex-col">
                    <p className="text-3xl">20</p>
                  </div>
                </Card>
                <Card className="col-span-1  flex flex-col w-full h-full justify-center items-center">
                  <p className="text-lg">Progresso</p>
                  <div className="flex p-3 flex-col">
                    <p className="text-3xl">50%</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsBlock;
