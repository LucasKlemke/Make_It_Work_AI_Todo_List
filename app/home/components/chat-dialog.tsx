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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import PlanBlock from './plan-block';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import SignOutButton from '../sign-out-button';

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
      message.toolInvocations.map((invocation) => {
        if (invocation.toolName === 'createPlan') {
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
        <div className="grid grid-cols-2 gap-5">
          <ScrollArea className="flex h-[70vh] flex-col w-full max-w-md py-24 mx-auto stretch">
            <div
              className={`whitespace-pre-wrap p-4 my-2 rounded-lg  text-slate-900  self-start`}
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
                  m.role === 'user' ? 'border bg-slate-100 self-start' : ''
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
              className="fixed bottom-0 w-full max-w-md p-2 mb-8 flex items-center"
            >
              <Input
                disabled={isLoading}
                value={input}
                className="shadow-md dark:shadow-none flex-grow"
                placeholder="Diga olá..."
                onChange={handleInputChange}
              />
              <Button type="submit" disabled={isLoading} className="ml-2">
                Enviar
              </Button>
            </form>
          </ScrollArea>
          {plan ? (
            <PlanBlock plan={plan} onClose={onClose} />
          ) : (
            <div className="h-[70vh] shadow-md p-5 border rounded-xl">
              <div className="flex flex-col items-start gap-y-3">
                <div className="flex items-center gap-x-3">
                  <p className="text-4xl bg-gradient-to-r inline-block text-transparent bg-clip-text from-blue-600 to-pink-400">
                    Make it Work
                  </p>
                  <Image
                    src={'/logo_to_do.png'}
                    width={30}
                    height={30}
                    alt={'xxx'}
                  />
                </div>

                <div className="mt-4">
                  <p className="text-start font-light text-5xl ">
                    Olá, {session?.user?.name}!
                  </p>
                  <div className="mt-4">
                    <p className="text-muted-foreground">
                      Antes de começar, precisamos que você explique melhor o
                      que deseja alcançar nos próximos 30 dias. Sarah está aqui
                      para te ajudar a decidir.
                    </p>
                    <div className="mt-4">
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
              <div className="flex pt-5">
                <SignOutButton />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
