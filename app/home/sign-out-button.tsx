import { Button } from '@/components/ui/button';
import React from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Button onClick={handleSignOut} type="submit">
      <LogOut />
      Sair
    </Button>
  );
};

export default SignOutButton;
