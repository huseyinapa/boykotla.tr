import React from 'react'

export default function BoykotDetail({ params }: { params: { slug: string } }) {
    var { slug } = params

    return (
        <div>{slug}</div>
    )
}
