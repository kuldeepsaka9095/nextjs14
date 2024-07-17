import Card from '@/components/card'
import Link from 'next/link'
import React from 'react'

const Archived = () => {
    return (
        <Card>
            <h3>Archived Notification</h3>
            <Link href="/dashboard">Default</Link>
        </Card>
    )
}

export default Archived