import { UserDropdown } from '@/features/auth/components/user-dropdown'
import { UserProfile } from '@/features/auth/components/user-profile'
import React from 'react'

export const Navbar = () => {
    return (
        <nav className="py-4 bg-blue-300 border-b">
            <div className="flex items-center justify-between max-w-screen mx-auto w-11/12">
                <ul>
                    <h1 className=" font-bold text-2xl">Title</h1>
                </ul>
                <ul>
                    <UserDropdown/>
                </ul>
            </div>
        </nav>
    )
}
