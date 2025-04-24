import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
    label: string;
    icon: LucideIcon;
    href: string;
}

export const SidebarItem = ({
    label,
    icon: Icon,
    href
}: SidebarItemProps) => {
  return (
    <Button className="w-full flex justify-start" variant="ghost">
        <Icon className="size-4 mr-2" />
        <Link to={href}>
          {label}
        </Link>
    </Button>
  )
}
