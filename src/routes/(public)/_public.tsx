import { useAuth } from '@/features/auth/hooks/use-auth';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { Loader } from 'lucide-react';

export const Route = createFileRoute('/(public)/_public')({
  component: PublicLayout,
})

function PublicLayout() {
  const { data: user, isLoading } = useAuth();

  if (isLoading) return (
    <div className="flex items-center h-screen justify-center">
      <Loader className="size-16 animate-spin" />
    </div>
  )

  if (user) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex items-center h-screen justify-center">
      <Outlet />
    </div>
  )
}
