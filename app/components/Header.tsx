"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link"
import { NextResponse } from "next/server";

function Header() {
    const { data: session } = useSession()

    const handleSignout = async () => {
        try {
            await signOut()
        } catch (error) {
            return NextResponse.json({
                error: "Failed to sign out"
            })
        }
    }
    return (
        <div>
            <button onClick={handleSignout}>Signout</button>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
        </div>
    )
}

export default Header
