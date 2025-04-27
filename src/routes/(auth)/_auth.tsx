import { Navbar } from '@/components/shared/navbar';
import { AppSidebar } from '@/components/shared/sidebar/app-sidebar';
import { Sidebar } from '@/components/shared/sidebar/sidebar';
import { SidebarContainer } from '@/components/shared/sidebar/sidebar-container';
import { SidebarContent } from '@/components/shared/sidebar/sidebar-content';
import { SidebarGroup } from '@/components/shared/sidebar/sidebar-group';
import { SidebarItem } from '@/components/shared/sidebar/sidebar-item';
import { SidebarMainWrapper } from '@/components/shared/sidebar/sidebar-main-wrapper';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { Apple, DoorOpen, HomeIcon, List, Loader, Scroll, SidebarIcon } from 'lucide-react';

export const Route = createFileRoute('/(auth)/_auth')({
  component: AuthLayout,
})

function AuthLayout() {
  const { data: user, isLoading } = useAuth();

  if (isLoading) return (
    <div className="flex items-center h-screen justify-center">
      <Loader className="size-16 animate-spin"/>
    </div>
  )

  if (!user) {
    return <Navigate to={"/"}/>;
  }
  return (
    <div>

        <SidebarContainer>
          <AppSidebar/>

          <SidebarMainWrapper>
            <Navbar/>

            <main className="max-w-screen mx-auto w-11/12">
              <Outlet/>
            </main>
          </SidebarMainWrapper>
        </SidebarContainer>

        

    </div>
    
  )
}
