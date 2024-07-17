"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useState } from "react";
// const navLink = [
//     { name: "Register", href: "/register" },
//     { name: "Login", href: "/login" },
//     { name: "Forgot password", href: "/forgot-password" }
// ]

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    // const [input, setInput] = useState("");

    return (
        <>
            <div className="col-12">
                <div>
                    {/* <input className="form-control" value={input} onChange={(e) => setInput(e.target.value)} /> */}
                </div>
                {/* {navLink.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    return (
                        <Link href={link.href} key={link.name} className={isActive ? "text-primary" : "text-secondary"}>
                            {link.name}
                        </Link>
                    )
                })} */}
                {children}
            </div>
        </>
    )
}