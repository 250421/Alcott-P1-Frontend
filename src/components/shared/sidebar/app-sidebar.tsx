import React from 'react'
import { SidebarItem } from './sidebar-item'
import { HomeIcon, Scroll, Plus } from 'lucide-react'
import { Sidebar } from './sidebar'
import { SidebarContent } from './sidebar-content'
import { SidebarGroup } from './sidebar-group'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { SidebarSeparator } from '@/components/ui/sidebar'

export const AppSidebar = () => {
    const { data: user } = useAuth();
    return (
        <div>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarItem label={"Home"} icon={HomeIcon} href={"/"} />
                        {/* 
                        <SidebarItem label={"Products"} icon={Scroll} href={"/products"} />
                        {user?.role === "ADMIN" && <SidebarSeparator className="bg-yellow-500"/>}
                        {user?.role === "ADMIN" && <SidebarItem label={"Add product"} icon={Plus} href={"/add-product"} />} 
                        */}
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </div>
    )
}
