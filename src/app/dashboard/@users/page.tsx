import Card from '@/components/card'
import React from 'react'

const UsersAnalytics = async () => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    return (
        <Card>UsersAnalytics</Card>
    )
}

export default UsersAnalytics