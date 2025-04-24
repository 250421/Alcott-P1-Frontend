import { SidebarContainer } from '@/components/shared/sidebar/sidebar-container'
import { SidebarItem } from '@/components/shared/sidebar/sidebar-item'
import { SidebarMainWrapper } from '@/components/shared/sidebar/sidebar-main-wrapper'
import { Sidebar, SidebarContent, SidebarGroup, SidebarProvider } from '@/components/ui/sidebar'
import { createFileRoute } from '@tanstack/react-router'
import { HomeIcon, List, Settings, LucideAirVent } from 'lucide-react'

export const Route = createFileRoute('/(auth)/_auth/home')({
  component: HomePage,
})

function HomePage() {
  return ( // HTML part goes here
    <SidebarProvider>
      <SidebarContainer>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarItem label={"Dashboard"} icon={HomeIcon} href={"/dashboard"} />
              <SidebarItem label={"Products"} icon={List} href={"/products"} />
              <SidebarItem label={"Settings"} icon={Settings} href={"/settings"} />
              <SidebarItem label={"Log out"} icon={LucideAirVent} href={"/sign-out"}/>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarMainWrapper>
          <div className="flex items-center justify-center">
              This is the home screen!
          </div>
        </SidebarMainWrapper>
      </SidebarContainer>
    </SidebarProvider>
  )
}

export default HomePage;