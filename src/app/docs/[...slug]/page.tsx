import React from 'react'

const Docs = ({ params, }: { params: { slug: string[] } }) => {
    if (params.slug.length === 2) {
        return (
            <h1>Viewing doc features{params.slug[0]} and concept {params.slug[1]}</h1>
        )
    } else if (params.slug.length === 1) {
        return <h1>Viewing doc for features {params.slug[0]}</h1>
    }
    return (
        <div>Docs HomePage....!!!</div>
    )
}

export default Docs