import React from 'react'
import { SidebarItem } from './sidebar-item'
import { HomeIcon, Scroll, List } from 'lucide-react'
import { Sidebar } from './sidebar'
import { SidebarContent } from './sidebar-content'
import { SidebarGroup } from './sidebar-group'

export const AppSidebar = () => {
    return (
        <div>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarItem label={"Home"} icon={HomeIcon} href={"/home"} />
                        <SidebarItem label={"Products"} icon={Scroll} href={"/products"} />
                        <SidebarItem label={"Categories"} icon={List} href={"/categories"} />
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </div>
    )
}
