"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function page() {

    const router = useRouter()
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            router.push('/auth/login')
        } catch (error: any) {
            console.log(error.message);

        }
    }
    return (
        <div>
            <button onClick={logout} className='bg-red-500 p-4 rounded-full mx-auto w-32 text-white'>Logout</button>
        </div>
    )
}
