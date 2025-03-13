import { Markdown } from '@/components/markdown';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@ai-sdk/react';
import { useSession } from 'next-auth/react';

export function ChatDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data: session } = useSession();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: { user_name: session?.user?.name, user_age: 18 },
    maxSteps: 5,
  });
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Converse com a IA</DialogTitle>
          <DialogDescription>
            Defina suas metas e objetivos aqui.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex  h-[70vh] flex-col w-full max-w-md py-24 mx-auto stretch">
          <div
            className={`whitespace-pre-wrap p-4 my-2 rounded-lg 'bg-gray-100 text-gray-900 self-start`}
          >
            <p className="font-semibold">AI:</p>
            <p>Como posso ajudar, {session?.user?.name} ?</p>
          </div>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`whitespace-pre-wrap p-4 my-2 rounded-lg ${
                m.role === 'user'
                  ? 'bg-blue-100 text-blue-900 self-end'
                  : 'bg-gray-100 text-gray-900 self-start'
              }`}
            >
              <p className="font-semibold">
                {' '}
                {m.role === 'user' ? session?.user?.name : 'AI: '}
              </p>
              {m.toolInvocations ? (
                <pre>{JSON.stringify(m.toolInvocations, null, 2)}</pre>
              ) : (
                <Markdown>{m.content}</Markdown>
              )}
            </div>
          ))}

          <form
            onSubmit={handleSubmit}
            className="fixed bottom-0 w-full max-w-md p-2 mb-8"
          >
            <Input
              value={input}
              className="shadow-md dark:shadow-none"
              placeholder="Diga olá..."
              onChange={handleInputChange}
            />
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
