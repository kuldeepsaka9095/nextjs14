import Card from '@/components/card'
import Link from 'next/link'
import React from 'react'

const Login = () => {
    return (
        <Card>
            <h3>Unable to render website, Firstly need to logIn ....</h3>
            <Link href="/login">Go To Login Page</Link>
        </Card>
    )
}

export default Login