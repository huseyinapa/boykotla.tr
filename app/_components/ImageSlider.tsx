// _components/ImageSlider.js
"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Open_Sans } from 'next/font/google';


const openSans = Open_Sans({
    subsets: ['latin'],
    display: 'swap',
});
export default function ImageSlider() {
    // 4 resimli slider için tanımlamalar
    const images = [
        "/images/0.png",
        "/images/1.png",
        "/images/2.jpeg",
        "/images/3.png",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); // her 4 saniyede bir otomatik değişim

        return () => clearInterval(interval)
    }, [images.length]);

    //manuel kontrolle resim değiştirme
    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    interface GoToSlideProps {
        index: number;
    }

    const goToSlide = (index: GoToSlideProps['index']) => {
        setCurrentIndex(index);
    }

    return (
        <div className='relative overflow-hidden shadow-2xl border border-white/20 min-h-screen w-full'>
            {images.map((src, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000
                             ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }
                        `}
                >
                    <Image
                        src={src}
                        alt={`slider image ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 70vw"
                        priority={index === 0}
                        className='object-cover object-center'
                    />
                </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className='absolute inset-x-0 top-6'>
                <header className='py-8 mb-8 mx-auto max-w-7xl px-4'>
                    <div className='flex flex-col '>
                        <h1 className={`text-4xl sm:text-5xl font-bold text-white text-center ${openSans.className}`}>Daha iyi bir yarın için
                        </h1>
                        <h1 className={`text-4xl sm:text-5xl font-bold text-white text-center ${openSans.className}`}>
                            bugün diren
                        </h1>
                    </div>
                    <p className='text-lg sm:text-xl text-gray-300 text-center mt-4'>Bilinçli Tüketici, Güçlü Toplum</p>
                </header>
            </div>
            <div className="absolute bottom-0 left-0 w-fit p-4 md:p-8 text-white">
                <h2 className='text-xl md:text-3xl font-bold mb-1 md:mb-2'>Farkındalık Yaratalım</h2>
                <p className="text-sm md:text-base">Boykot hareketini destekleyerek ekonomik adalet ve etik tüketim için ses olun.</p>
            </div>

            <button
                className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 cursor-pointer bg-black/60 hover:bg-black/60 text-white rounded-full p-1 md:p-2 transition-colors"
                onClick={goToPrevious}
            >
                <Icon icon="mdi:chevron-left" width={20} height={20} className="md:w-6 md:h-6" />
            </button>

            <button
                className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 cursor-pointer bg-black/60 hover:bg-black/60 text-white rounded-full p-1 md:p-2 transition-colors"
                onClick={goToNext}
            >
                <Icon icon="mdi:chevron-right" width={20} height={20} className="md:w-6 md:h-6" />
            </button>

            <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors 
                            ${index === currentIndex ? 'bg-white' : 'bg-white/40'}
                            `}
                        onClick={() => goToSlide(index)}
                    >
                    </button>
                ))}
            </div>
        </div>
    );
}