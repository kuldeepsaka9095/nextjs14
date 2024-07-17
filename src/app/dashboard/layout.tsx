import React from "react";
import { Suspense } from "react";
export default function DashBoardLayout({
    children,
    users,
    revenue,
    notification,
    login
}: {
    children: React.ReactNode;
    users: React.ReactNode;
    revenue: React.ReactNode;
    notification: React.ReactNode;
    login: React.ReactNode;


}) {
    const isLoggedIn = true;
    return isLoggedIn ? (
        <>
            <div>{children}</div>
            <div style={{ display: "flex" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Suspense fallback={<p>Loading Analaytics....</p>}><div>{users}</div></Suspense>
                    <div>{revenue}</div>
                </div>
                <div style={{ display: "flex", flex: "1" }}>
                    <Suspense fallback={<p>Loading Notifications.....</p>}>{notification}</Suspense>
                </div>
            </div>
        </>
    ) : (
        <div>{login}</div>
    )
}