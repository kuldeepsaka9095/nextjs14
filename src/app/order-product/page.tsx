"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
const OrderProduct = () => {
    const router = useRouter();
    const handleClick = () => {
        console.log("placing your order");
        router.back();
        // router.push("/");
        // router.forward("desigredLink");




    }
    return (
        <div>
            <h2>OrderProduct</h2>
            <Button onClick={handleClick}>place order</Button>
        </div>
    )
}

export default OrderProduct