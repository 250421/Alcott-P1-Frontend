import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from "@/lib/utils"
import React from 'react'

interface SidebarProps {
    children: React.ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
    const { isOpen } = useSidebar();
  return (
    <div className={cn(
        "fixed top-0 left-0 border-r h-screen transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "w-64 bg-blue-300" : "w-0 bg-transparent")}>
          {children}
    </div>
  )
}
