
"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";

import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { showNotification } = useNotification();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            showNotification(result.error, "error");
        } else {
            showNotification("Login successful!", "success");
            router.push("/");
        }
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-slate-950 dark:bg-black">
            <h2 className="font-bold text-xl text-white dark:text-neutral-200">
                Login
            </h2>
            <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                    <Label className="text-white" htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        placeholder="yourgmail@gmail.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label className="text-white" htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn
                     from-purple-600 to-pink-600
                     dark:from-purple-800 dark:to-pink-800
                     w-full text-white rounded-md h-10 font-medium"
                    type="submit"
                >
                    Login &rarr;
                    <BottomGradient />

                </button>
                <p className="text-center  mt-4">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-blue-500 hover:text-blue-600">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
