import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from '../hooks/use-auth'


export const UserProfile = () => {
    const { data: user } = useAuth();

    const getInitials = (name: string) => {
        return (name[0] + name[1]).toUpperCase();
    };

    return (
        <Avatar>
            <AvatarFallback>{getInitials(user?.username ?? "")}</AvatarFallback>
        </Avatar>
    );
};
