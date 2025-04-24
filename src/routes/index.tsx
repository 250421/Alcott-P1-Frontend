import { SidebarContainer } from '@/components/shared/sidebar/sidebar-container'
import { SidebarItem } from '@/components/shared/sidebar/sidebar-item'
import { SidebarMainWrapper } from '@/components/shared/sidebar/sidebar-main-wrapper'
import { SidebarContent } from '@/components/shared/sidebar/sidebar-content';
import { createFileRoute } from '@tanstack/react-router'
import { HomeIcon, List, LucideAirVent, Settings } from 'lucide-react';
import { Sidebar } from '@/components/shared/sidebar/sidebar';
import { SidebarGroup } from '@/components/shared/sidebar/sidebar-group';


export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
    return ( // HTML part goes here
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
    )
}