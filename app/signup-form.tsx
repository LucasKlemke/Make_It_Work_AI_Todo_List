'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

const formSchema = z
  .object({
    name: z
      .string()
      .nonempty('Campo obrigatório')
      .regex(/^[A-Za-z]+$/i, 'Apenas letras são permitidas'),
    age: z.coerce
      .number()
      .gte(15, 'A idade mínima é de 15 anos')
      .lte(100, 'A idade máxima é de 100 anos'),
    email: z.string().email('Email inválido'),
    password: z
      .string()
      .nonempty('Campo obrigatório')
      .min(5, 'A senha deve ter mais de 5 caracteres')
      .max(13, 'A senha deve ter menos de 13 caracteres'),
    passwordConfirm: z
      .string()
      .nonempty('Campo obrigatório')
      .min(5, 'A senha deve ter mais de 5 caracteres')
      .max(13, 'A senha deve ter menos de 13 caracteres'),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: 'Senhas não conferem',
    path: ['passwordConfirm'],
  });

export function SignUpForm({ action }: { action: (data: FormData) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 18,
      password: '',
      passwordConfirm: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('age', values.age.toString());
    formData.append('password', values.password);
    formData.append('passwordConfirm', values.passwordConfirm);
    action(formData);
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="O seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Idade</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Sua idade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="usuario@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirmar senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition flex items-center justify-center"
        >
          Completar cadastro
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}
