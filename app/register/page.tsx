
// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useNotification } from "../components/Notification";
// import Link from "next/link";

// import { Label } from "../components/ui/label";
// import { Input } from "../components/ui/input";
// import { cn } from "@/lib/utils";

// export default function Register() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const router = useRouter();
//     const { showNotification } = useNotification();

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         if (password !== confirmPassword) {
//             showNotification("Passwords do not match", "error");
//             return;
//         }

//         try {
//             const res = await fetch("/api/auth/register", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await res.json();

//             if (!res.ok) {
//                 throw new Error(data.error || "Registration failed");
//             }

//             showNotification("Registration successful! Please log in.", "success");
//             router.push("/login");
//         } catch (error) {
//             showNotification(
//                 error instanceof Error ? error.message : "Registration failed",
//                 "error"
//             );
//         }
//     };

//     return (
//         <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
//             <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
//                 Create Your Account
//             </h2>

//             <form className="my-8" onSubmit={handleSubmit}>
//                 <LabelInputContainer className="mb-4">
//                     <Label htmlFor="email">Email Address</Label>
//                     <Input
//                         id="email"
//                         placeholder="yourgmail@gmail.com"
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </LabelInputContainer>
//                 <LabelInputContainer className="mb-4">
//                     <Label htmlFor="password">Password</Label>
//                     <Input
//                         id="password"
//                         placeholder="••••••••"
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </LabelInputContainer>
//                 <LabelInputContainer className="mb-8">
//                     <Label htmlFor="confirmPassword">Confirm Password</Label>
//                     <Input
//                         id="confirmPassword"
//                         placeholder="••••••••"
//                         type="password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                     />
//                 </LabelInputContainer>

//                 <button
//                     type="submit"
//                     className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
//                 >
//                     Register &rarr;
//                     <BottomGradient />
//                 </button>

//                 <p className="text-center text-black mt-4">
//                     Already have an account?{" "}
//                     <Link href="/login" className="text-blue-500 hover:text-blue-600">
//                         Login
//                     </Link>
//                 </p>
//             </form>
//         </div>
//     );
// }

// const BottomGradient = () => {
//     return (
//         <>
//             <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//             <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//         </>
//     );
// };

// const LabelInputContainer = ({
//     children,
//     className,
// }: {
//     children: React.ReactNode;
//     className?: string;
// }) => {
//     return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
// };





"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";

import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const { showNotification } = useNotification();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            showNotification("Passwords do not match", "error");
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }

            showNotification("Registration successful! Please log in.", "success");
            router.push("/login");
        } catch (error) {
            showNotification(
                error instanceof Error ? error.message : "Registration failed",
                "error"
            );
        }
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-slate-950 dark:bg-blue-400 text-white">
            <h2 className="font-bold text-xl text-white dark:text-neutral-200">
                Create Your Account
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
                <LabelInputContainer className="mb-8">
                    <Label className="text-white" htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        placeholder="••••••••"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </LabelInputContainer>

                <button
                    type="submit"
                    className="bg-gradient-to-br relative group/btn
                     from-purple-600 to-pink-600
                     dark:from-purple-800 dark:to-pink-800
                     w-full text-white rounded-md h-10 font-medium"
                >
                    Register &rarr;
                    <BottomGradient />
                </button>

                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:text-blue-600">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            {/* This thin line appears under the button on hover */}
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
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
