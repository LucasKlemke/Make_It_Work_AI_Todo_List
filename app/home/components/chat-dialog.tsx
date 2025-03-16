import { Markdown } from '@/components/markdown';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@ai-sdk/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import PlanBlock from './plan-block';
import { Loader2, SendHorizonal } from 'lucide-react';
import Image from 'next/image';
import SignOutButton from '../sign-out-button';
import { ThemeSwitcher } from '@/components/theme-switcher';

export function ChatDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: { user_name: session?.user?.name, user_age: 18 },
    maxSteps: 5,
    onFinish: (message) => {
      setIsLoading(false);
      message.toolInvocations?.map((invocation) => {
        if (invocation.toolName === 'createPlan') {
          // @ts-ignore
          setPlan(invocation.result);
        }
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={() => console.log('nada')}>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Defina suas metas</DialogTitle>
          <DialogDescription onClick={() => console.log(plan)}>
            Antes de começar, vamos criar um plano para os próximos 30 dias.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-5 text-sm md:text-base">
          <ScrollArea className="flex lg:col-span-1 col-span-2 h-[30vh] md:h-[40vh] lg:h-[70vh] order-2 lg:order-1 flex-col w-full lg:max-w-md py-12 lg:py-24 lg:mx-auto stretch">
            <div
              className={`whitespace-pre-wrap p-4 my-2 rounded-lg    self-start`}
            >
              <p className="bg-gradient-to-r inline-block text-transparent bg-clip-text from-blue-600 to-pink-400">
                Sarah:
              </p>
              <p onClick={() => console.log(messages)}>
                Olá {session?.user?.name} ! O que você gostaria de
                fazer/aprender nos próximos 30 dias ?
              </p>
            </div>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`whitespace-pre-wrap p-4 my-2 rounded-lg ${
                  m.role === 'user'
                    ? 'border bg-slate-100 dark:bg-slate-800 self-start'
                    : ''
                }`}
              >
                <p
                  className={`font-semibold ${m.role !== 'user' && ' bg-gradient-to-r inline-block text-transparent bg-clip-text from-blue-600 to-pink-400'}`}
                >
                  {m.role === 'user' ? session?.user?.name : 'Sarah:'}
                </p>
                {m.toolInvocations ? (
                  <p>Plano foi criado com sucesso</p>
                ) : (
                  <Markdown>{m.content}</Markdown>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-center my-4">
                <Loader2 className="animate-spin" />
              </div>
            )}
            <form
              onSubmit={(e) => {
                handleSubmit(e);
                setIsLoading(true);
              }}
              className="fixed bottom-0 w-full max-w-xs lg:max-w-md p-2 mb-8 flex items-center"
            >
              <Input
                disabled={isLoading}
                value={input}
                className="shadow-md dark:shadow-none flex-grow"
                placeholder={
                  messages.length == 0 ? 'Diga olá...' : 'Digite aqui...'
                }
                onChange={handleInputChange}
              />
              <Button type="submit" size={'icon'} disabled={isLoading} className="md:ml-2">
                <SendHorizonal/>
              </Button>
            </form>
          </ScrollArea>
          {plan ? (
            <PlanBlock plan={plan} onClose={onClose} />
          ) : (
            <ScrollArea className="lg:h-[70vh] md:h-auto h-[40vh] col-span-2 lg:col-span-1 order-1 lg:order-2 shadow-md p-5 border rounded-xl">
              <div className="flex flex-col items-start gap-y-3">
                <div className="flex items-center w-full justify-between">
                  <div className="flex gap-x-3">
                    <p className=" text-2xl md:text-4xl bg-gradient-to-r inline-block text-transparent bg-clip-text from-blue-600 to-pink-400">
                      Make it Work
                    </p>
                    <Image
                      src={'/logo_to_do.png'}
                      width={30}
                      height={30}
                      alt={'xxx'}
                    />
                  </div>

                  <ThemeSwitcher />
                </div>

                <div className=" md:mt-4">
                  <p className="text-start font-light text-lg md:text-5xl ">
                    Olá, {session?.user?.name}!
                  </p>
                  <div className="mt-4">
                    <p className="text-sm md:text-base text-muted-foreground">
                      Antes de começar, precisamos que você explique melhor o
                      que deseja alcançar nos próximos 30 dias. Sarah está aqui
                      para te ajudar a decidir.
                    </p>
                    <div className=" md:mt-4 text-sm md:text-base">
                      <p className=" mt-2">
                        1. Defina os objetivos que deseja alcançar nos próximos
                        30 dias.
                      </p>
                      <p className=" mt-2">
                        2. Converse com a IA para personalizar suas metas.
                      </p>
                      <p className=" mt-2">
                        3. A IA criará um plano de 30 dias baseado nas suas
                        metas.
                      </p>
                      <p className=" mt-2">
                        4. Revise e confirme o plano para começar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex pt-5 w-full justify-end">
                <SignOutButton />
              </div>
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
