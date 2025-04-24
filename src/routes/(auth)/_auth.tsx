import { Sidebar } from '@/components/shared/sidebar/sidebar';
import { SidebarContainer } from '@/components/shared/sidebar/sidebar-container';
import { SidebarContent } from '@/components/shared/sidebar/sidebar-content';
import { SidebarGroup } from '@/components/shared/sidebar/sidebar-group';
import { SidebarItem } from '@/components/shared/sidebar/sidebar-item';
import { SidebarMainWrapper } from '@/components/shared/sidebar/sidebar-main-wrapper';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { DoorOpen, HomeIcon, List, Loader, Settings } from 'lucide-react';

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
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <SidebarItem label={"Home"} icon={HomeIcon} href={"/home"} />
                <SidebarItem label={"Products"} icon={List} href={"/products"} />
                <SidebarItem label={"Settings"} icon={Settings} href={"/settings"} />
                <SidebarItem label={"Log out"} icon={DoorOpen} href={"/sign-out"} />
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <SidebarMainWrapper>
            <h1></h1>
          </SidebarMainWrapper>
        </SidebarContainer>

        <Outlet/>

    </div>
    
  )
}
