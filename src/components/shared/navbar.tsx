import { UserDropdown } from '@/features/auth/components/user-dropdown'
import { UserProfile } from '@/features/auth/components/user-profile'
import React from 'react'

export const Navbar = () => {
    return (
        <nav className="py-4 bg-blue-300 border-b">
            <div className="flex justify-between max-w-screen mx-auto w-11/12">
                <ul className="flex justify-between items-center">
                    <h1 className=" font-bold text-2xl">Magic Bag</h1>
                    <h1 className="mx-2 text-2xl">Inventory Management System</h1>
                </ul>
                <ul>
                    <UserDropdown/>
                </ul>
            </div>
        </nav>
    )
}
