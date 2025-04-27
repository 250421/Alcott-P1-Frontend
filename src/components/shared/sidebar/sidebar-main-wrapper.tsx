import { useSidebar } from '@/hooks/use-sidebar';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils"
import React from 'react'
import { SidebarIcon } from 'lucide-react';

interface SidebarMainWrapperProps {
    children: React.ReactNode;
}

export const SidebarMainWrapper = ({ children }: SidebarMainWrapperProps) => {
    const { isOpen, toggle } = useSidebar();
  return (
    <div className={cn( "transition-all duration-300 ease-in-out",
        isOpen ? "ml-64" : "ml-0"
    )}>
        <Button variant={"ghost"} size={"icon"} onClick={toggle} className="fixed size-8 z-50 m-3 my-20 cursor-pointer">
            <SidebarIcon />
        </Button>
        {children}
    </div>
  )
}
