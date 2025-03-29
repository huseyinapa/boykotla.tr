import Image from 'next/image';
import React from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function Cards() {
    const images = [
        "/images/ahaber.png",
        "/images/aksam-gazetesi.png",
        "/images/atv.png",
        "/images/audi.png",
        "/images/beyaztv.png",
        "/images/cnn_turk.png",
        "/images/demiroren.png",
        "/images/dogus.png",
        "/images/dr_store.png",
        "/images/ets_tur.png",
        "/images/gunaydin-restaurant.png",
        "/images/iddaa.png",
        "/images/idefix.png",
        "/images/iha.png",
        "/images/ihlas_ev.png",
        "/images/ihlas-medya.png",
        "/images/kanald.png",
        "/images/kral-fm.png",
        "/images/milli_piyango.png",
        "/images/misli.png",
        "/images/ntv.png",
        "/images/nusret.png",
        "/images/sabah.png",
        "/images/skoda.png",
        "/images/star.png",
        "/images/tgrt.png",
        "/images/trt.png",
        "/images/turkuvaz-medya.png",
        "/images/turkiye-gazetesi.png",
        "/images/dha-demiroren.png",
        "/images/volkswagen.png",
        "/images/yenisafak-gazetesi.png"
    ];
    // test

    // Dosya adından slug oluşturma fonksiyonu
    const generateSlug = (imagePath: string) => {
        const filename = imagePath.split('/').pop()?.replace(/\.(png|jpg|jpeg)/, '');
        return filename?.toLowerCase() || '';
    };

    return (
        <div className='w-full'>
            <h2 className='font-semibold text-4xl text-white mb-4 md:mb-6'>Boykot Yapılan Markalar</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {images.map((src, index) => {
                    const slug = generateSlug(src);
                    return (
                        <Link href={`/boykotlar/${slug}`} key={index} className="relative group aspect-square">
                            <div className="absolute -inset-2 sm:-inset-3 md:-inset-4  z-[-1]"></div>

                            <div className="relative w-full h-full rounded-xl shadow-lg hover:bg-white/90 transition-all duration-300 flex flex-col items-center justify-center bg-white">
                                <div className='w-full h-full flex items-center justify-center p-2'>
                                    <Image
                                        src={src}
                                        alt={slug}
                                        width={100}
                                        height={100}
                                        className="object-contain w-full h-full"
                                    />
                                </div>

                                <div className="absolute top-2 left-2 backdrop-blur-xl rounded-full p-1 sm:p-1.5 shadow-slate-500 shadow-lg hover:scale-110 transition-transform">
                                    <Icon
                                        icon="iconoir:prohibition"
                                        width={36}
                                        height={36}
                                        className="text-red-600"
                                    />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
