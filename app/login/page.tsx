import Link from 'next/link';
import { signIn } from '../auth';
import { SignIn } from '../signin-form';
import { Check, UserCheck } from 'lucide-react';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="flex h-screen overflow-hidden flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-primary backdrop-blur-sm p-10 text-white dark:text-black flex-col justify-between">
        <div className="flex items-center gap-x-3">
          <p className="text-4xl bg-gradient-to-r inline-block text-transparent bg-clip-text from-blue-600 to-pink-400">
            Make it Work
          </p>
          <Image src={'/logo_to_do.png'} width={30} height={30} alt={'xxx'} />
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold">
            Bem vindo de volta a nossa plataforma
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Faça login para continuar a sua jornada.
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
      <div className="flex-1 bg-background flex flex-col p-6 md:p-10 justify-center md:justify-between">
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
              <UserCheck />
              <h2 className="text-2xl font-bold tracking-tight">
                Bem-vindo de volta
              </h2>
            </div>

            <p className="text-muted-foreground mt-2">
              Entre com sua conta para continuar.
            </p>
          </div>

          {/* Placeholder for your existing form */}
          <SignIn
            action={async (formData: FormData) => {
              'use server';
              await signIn('credentials', {
                redirectTo: '/',
                email: formData.get('email') as string,
                password: formData.get('password') as string,
              });
            }}
          />

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Não possui conta ?{' '}
              <Link href="/register" className="text-primary hover:underline">
                Cadastro
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
