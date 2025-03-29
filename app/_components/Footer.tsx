"use client";
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function Footer() {
    const [currentUrl, setCurrentUrl] = useState<string>('');


    useEffect(() => {
        setCurrentUrl(window.location.href)
    }, [])
    const shareMessage = "Daha iyi bir yarın için bugün diren! Bilinçli Tüketici, Güçlü Toplum";
    const socialLinks = [
        {
            name: 'Whatsapp',
            icon: 'mdi:whatsapp',
            url: `https://wa.me/?text=${encodeURIComponent(shareMessage + ' ' + currentUrl)}`,
            hoverColor: 'text-green-400',
            shareText: 'Whatsapp ile paylaş'
        },
        {
            name: 'Twitter',
            icon: 'prime:twitter',
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(currentUrl)}}`,
            hoverColor: 'text-gray-400',
            shareText: 'Twitter ile paylaş'
        },
        {
            name: 'Facebook',
            icon: 'mdi:facebook',
            url: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(currentUrl)}`,
            hoverColor: 'text-blue-400',
            shareText: 'Facebook ile paylaş'
        }
    ]
    return (
        <div className='bg-gradient-to-r from-red-700 to-red-500 py-8 shadow-md'>
            <div className='max-w-7xl mx-auto px-4'>
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-white text-3xl font-bold mb-4 animate-pulse">
                        Direnişte Yerini Al!
                    </h2>
                    <p className='text-white text-xl mb-6 font-medium'>Paylaş</p>
                    <div className="flex items-center gap-6 mb-4">
                        {socialLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url}
                                target='_blank'
                                className='transform hover:scale-110 transition-transform duration-300 relative group'>

                                <Icon
                                    icon={link.icon}
                                    className={`text-white hover:${link.hoverColor} w-12 h-12`}

                                />
                            </Link>
                        ))}
                    </div>
                    <div className="w-32 h-1 bg-white rounded-full mx-auto mt-2 mb-6"></div>
                    <button className='bg-white text-red-600 font-bold py-3 px-8 rounded-full hover:bg-red-100 transition-colors duration-30 shadow-md'>
                        KATIL
                    </button>
                </div>


            </div>

        </div>
    )
}
