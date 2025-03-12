import Link from 'next/link';
import { Check, UserPlus } from 'lucide-react';
import Image from 'next/image';
import { SignUpForm } from '@/app/signup-form';
import { redirect } from 'next/navigation';
import { createUser, getUser } from '@/db/schema';

export default function Login() {
  async function register(formData: FormData) {
    'use server';
    let email = formData.get('email') as string;
    let age = formData.get('age') as string;
    let name = formData.get('name') as string;
    let password = formData.get('password') as string;
    let user = await getUser(email);

    if (user.length > 0) {
      return 'User already exists'; // TODO: Handle errors with useFormStatus
    } else {
      await createUser(name, Number(age), email, password);
      redirect('/login');
    }
  }

  return (
    <div className="flex h-screen overflow-hidden flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-primary p-10 text-white flex-col justify-between">
        <div className="flex items-center gap-x-3">
          <p className="text-4xl bg-gradient-to-r inline-block text-transparent bg-clip-text from-blue-600 to-pink-400">
            Make it Work
          </p>
          <Image src={'/logo_to_do.png'} width={30} height={30} alt={'xxx'} />
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold">Bem vindo à nossa plataforma</h2>
          <p className="text-primary-foreground/80 text-lg">
            Cadastre-se para começar a usar a nossa plataforma e alcançar seus
            objetivos.
          </p>

          <div className="space-y-4 mt-8">
            <div className="flex items-start space-x-2">
              <div className="bg-white/20 rounded-full p-1 mt-0.5">
                <Check className="h-4 w-4" />
              </div>
              <p>Defina seus objetivos atráves de Inteligência Artifical</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="bg-white/20 rounded-full p-1 mt-0.5">
                <Check className="h-4 w-4" />
              </div>
              <p>Acompanhe o seu progresso</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="bg-white/20 rounded-full p-1 mt-0.5">
                <Check className="h-4 w-4" />
              </div>
              <p>Desbloqueie conquistas conforme você conquista seus sonhos</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-primary-foreground/70">
          © 2025 Make It Work. Todos os direitos reservados.
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex flex-col p-6 md:p-10 justify-center md:justify-between">
        {/* Mobile logo */}
        <div className="md:hidden mb-8">
          <div className="flex items-center gap-x-3">
            <p className="text-4xl bg-gradient-to-r inline-block text-transparent bg-clip-text from-blue-600 to-pink-400">
              Make it Work
            </p>
            <Image src={'/logo_to_do.png'} width={30} height={30} alt={'xxx'} />
          </div>
        </div>

        <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center gap-x-2">
              <UserPlus />
              <h2 className="text-2xl font-bold tracking-tight">Cadastre-se</h2>
            </div>
            <p className="text-muted-foreground mt-2">
              Preencha os campos abaixos para começar.
            </p>
          </div>
          {/* Placeholder for your existing form */}
          <SignUpForm action={register} />
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Ja possui conta ?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </div>

        {/* Footer links - only visible on larger screens */}
        <div className="hidden md:flex justify-between text-sm text-muted-foreground mt-8">
          <div>© 2025 Make It Work</div>
        </div>
      </div>
    </div>
  );
}
