import { useSignOut } from '@/features/auth/hooks/use-sign-out';
import { createFileRoute, Navigate } from '@tanstack/react-router'
import { Loader } from 'lucide-react';
import { useEffect } from 'react';

export const Route = createFileRoute('/sign-out')({
  component: SignOutPage,
})

function SignOutPage() {
  const {mutate: signout} = useSignOut();

  useEffect(() => {
    signout();
  }, [signout]);

  return (
    <div className="flex items-center h-screen justify-center">
      <Loader className="size-16 animate-spin"/>
      
    </div>
    
  )
}
