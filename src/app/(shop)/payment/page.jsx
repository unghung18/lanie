'use client'
import { useSession } from 'next-auth/react';
import React from 'react';
import { redirect } from 'next/navigation';

const Page = () => {
    const session = useSession();
    if (session.status === "unauthenticated") {
        redirect("/login")
    }
    return (
        <div>Page</div>
    )
}

export default Page