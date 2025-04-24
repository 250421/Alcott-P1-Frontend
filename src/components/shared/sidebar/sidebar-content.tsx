import React from 'react'

interface SidebarContentProps {
    children: React.ReactNode;
}

export const SidebarContent = ({ children }: SidebarContentProps) => {
  return (
    <div>{children}</div>
  )
}
