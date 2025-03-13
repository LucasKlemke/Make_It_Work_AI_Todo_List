'use client';
import { Input } from '@/components/ui/input';
import { useChat } from '@ai-sdk/react';
import { useSession } from 'next-auth/react';

export default function Chat() {
  const { data: session } = useSession();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: { user_name: session?.user?.name },
    maxSteps: 5,
  });
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
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
            <p>{m.content}</p>
          )}
        </div>
      ))}

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full max-w-md p-2 mb-8"
      >
        <Input
          value={input}
          className='shadow-md dark:shadow-none'
          placeholder="Diga olá..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
