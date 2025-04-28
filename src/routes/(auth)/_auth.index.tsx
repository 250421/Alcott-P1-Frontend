import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/(auth)/_auth/')({
  component: Index,
})

function Index() {


    return ( // HTML part goes here
        <div>
            Home screen!
        </div>
    )
        
}