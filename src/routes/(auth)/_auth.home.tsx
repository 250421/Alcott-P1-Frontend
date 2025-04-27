import { SidebarContainer } from '@/components/shared/sidebar/sidebar-container'
import { SidebarItem } from '@/components/shared/sidebar/sidebar-item'
import { SidebarMainWrapper } from '@/components/shared/sidebar/sidebar-main-wrapper'
import { Sidebar, SidebarContent, SidebarGroup, SidebarProvider } from '@/components/ui/sidebar'
import { createFileRoute } from '@tanstack/react-router'
import { HomeIcon, List, Settings, DoorOpen } from 'lucide-react'

export const Route = createFileRoute('/(auth)/_auth/home')({
  component: HomePage,
})

function HomePage() {
  return ( // HTML part goes here
      <div>Home screen!</div>
  )
}

export default HomePage;