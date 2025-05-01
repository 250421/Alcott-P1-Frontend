import { SidebarSeparator } from '@/components/ui/sidebar'
import AppSearchTable from '@/features/auth/components/home-search/page'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/(auth)/_auth/')({
  component: Index,
})

function Index() {


    return ( // HTML part goes here
        <div className="justify-center items-center flex flex-col">
            <h6 className="text-3xl font-bold">Search</h6>
            <SidebarSeparator className="my-10" />
            <AppSearchTable />
        </div>
    )
        
}