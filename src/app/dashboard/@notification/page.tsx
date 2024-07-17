import Card from '@/components/card'
import Link from 'next/link'
import React from 'react'

const Notifications = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return (
        <Card>
            <h2>Notification</h2>
            <Link href="/dashboard/archived">Archived</Link>
        </Card>

    )
}

export default Notifications