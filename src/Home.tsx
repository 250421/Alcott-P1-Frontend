import { HomeIcon, List, LucideAirVent, Settings } from 'lucide-react';
import { Sidebar } from './components/shared/sidebar/sidebar';
import { SidebarContainer } from './components/shared/sidebar/sidebar-container';
import { SidebarContent } from './components/shared/sidebar/sidebar-content';
import { SidebarGroup } from './components/shared/sidebar/sidebar-group';
import { SidebarItem } from './components/shared/sidebar/sidebar-item';

import './Home.css'
import { SidebarMainWrapper } from './components/shared/sidebar/sidebar-main-wrapper';

function Home() {
//logic goes here

  return ( // HTML part goes here
      <SidebarContainer>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarItem label={"Dashboard"} icon={HomeIcon} href={"/dashboard"} />
              <SidebarItem label={"Products"} icon={List} href={"/products"} />
              <SidebarItem label={"Settings"} icon={Settings} href={"/settings"} />
              <SidebarItem label={"Log out"} icon={LucideAirVent} href={"/logout"} />
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarMainWrapper>
          <div>This is the home screen!</div>
        </SidebarMainWrapper>
      </SidebarContainer>
  )
}

export default Home
