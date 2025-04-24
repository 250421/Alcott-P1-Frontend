import { SidebarContainer } from '@/components/shared/sidebar/sidebar-container'
import { SidebarItem } from '@/components/shared/sidebar/sidebar-item'
import { SidebarMainWrapper } from '@/components/shared/sidebar/sidebar-main-wrapper'
import { SidebarContent } from '@/components/shared/sidebar/sidebar-content';
import { createFileRoute, Link, Navigate } from '@tanstack/react-router'
import { HomeIcon, List, LucideAirVent, Settings } from 'lucide-react';
import { Sidebar } from '@/components/shared/sidebar/sidebar';
import { SidebarGroup } from '@/components/shared/sidebar/sidebar-group';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/use-auth';


export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
    const { data: user, isLoading } = useAuth();
    

    if (user) {
        return <Navigate to={"/home"}/>;
    }

    return ( // HTML part goes here
        <div>
            <Button className="w-full flex items-center justify-center" variant="ghost">
                <Link to={"/sign-in"}>
                  Sign In
                </Link>
            </Button>
            <Button className="w-full flex items-center justify-center" variant="ghost">
                <Link to={"/sign-up"}>
                  Sign Up
                </Link>
            </Button>
        </div>
    )
        
}