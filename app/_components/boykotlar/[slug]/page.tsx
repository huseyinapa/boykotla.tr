import React from 'react'
export default function BoykotDetail({ params }: { params: { slug: string } }) {
       return (
        <div>{params.slug}</div>
    )
}
