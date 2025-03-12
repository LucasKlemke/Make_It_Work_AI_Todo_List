'use client';
import { Button } from '@/components/ui/button';
import { Hourglass, Settings, Target, User } from 'lucide-react';
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
const SettingsBlock = () => {
  const { data: session } = useSession();

  return (
    <div className="col-span-6 md:col-span-2 rounded-3xl h-full border-2 z-30 shadow-md dark:shadow-none border-slate-400 p-4">
      <div className="flex gap-x-2 flex-col md:flex-row">
        <div className="flex flex-col w-full gap-y-2 sm:col-span-4 lg:col-span-3">
          <div className="flex border-b cursor-pointer justify-center font-bold text-xl gap-x-3 items-center  rounded-tr-3xl rounded-tl-3xl p-3 ">
            <p>Usuário</p>
          </div>

          <div className="flex flex-col gap-y-2 pb-4">
            <div className="flex gap-x-1 items-center">
              <User size={15} />
              <p className="text-sm">Nome:</p>
              <p className="text-sm">{session?.user?.name}</p>
            </div>
            <div className="flex gap-x-1 items-center">
              <Target size={15} />
              <p className="text-sm">Objetivo Atual:</p>
              <p className="text-sm">Ser saúdavel</p>
            </div>
            <div className="flex gap-x-1 items-center">
              <Hourglass size={15} />
              <p className="text-sm">Tempo restante:</p>
              <p className="text-sm">8 Dias</p>
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
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Metas</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsBlock;
