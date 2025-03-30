import Image from 'next/image';
import React from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

type BoykotPageProps = {
    params: {
        slug: string;
    };
};

export default function Cards() {
    const images = [
        "/ahaber.png",
        "/aksam-gazetesi.png",
        "/atv.png",
        "/audi.png",
        "/beyaztv.png",
        "/cnn_turk.png",
        "/demiroren.png",
        "/dogus.png",
        "/dr_store.png",
        "/ets_tur.png",
        "/gunaydin-restaurant.png",
        "/iddaa.png",
        "/idefix.png",
        "/iha.png",
        "/ihlas_ev.png",
        "/ihlas-medya.png",
        "/kanald.png",
        "/kral-fm.png",
        "/milli_piyango.png",
        "/misli.png",
        "/ntv.png",
        "/nusret.png",
        "/sabah.png",
        "/skoda.png",
        "/star.png",
        "/tgrt.png",
        "/trt.png",
        "/turkuvaz-medya.png",
        "/turkiye-gazetesi.png",
        "/dha-demiroren.png",
        "/volkswagen.png",
        "/yenisafak-gazetesi.png"
    ];


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
                        <Link href={`/boykot/${slug}`} key={index} className="relative group aspect-square">
                            <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 z-[-1]"></div>

                            <div className="relative w-full h-full rounded-xl shadow-lg hover:bg-white/90 transition-all duration-300 flex flex-col items-center justify-center bg-white">
                                <div className='w-full h-full flex items-center justify-center p-2'>
                                    <Image
                                        src={`/images${src}`}
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

// Metadata üretmek için de asenkron tanımlamalıyız (eğer params.slug veya veri çekme kullanılıyorsa)
export async function generateMetadata({ params }: BoykotPageProps) {
    // const response = await fetch(`https://boykot.tr/boykot/${params.slug}`);
    const response = await fetch(`http://localhost:3000/api/boycot/${params.slug}`);
    const boykotData = await response.json();

    return {
        title: boykotData.title,
        description: boykotData.description,
    };
}