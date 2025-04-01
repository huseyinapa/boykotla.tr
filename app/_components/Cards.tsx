"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { ModeToggle } from './ModToggle';

type BoykotPageProps = {
    params: {
        slug: string;
    };
};

export default function Cards() {

    const images = React.useMemo(() => [
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
    ], []);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBoycot, setFilteredBoycot] = useState(images);

    // Dosya adından slug oluşturma fonksiyonu
    const generateSlug = (imagePath: string) => {
        const filename = imagePath.split('/').pop()?.replace(/\.(png|jpg|jpeg)/, '');
        return filename?.toLowerCase() || '';
    };

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredBoycot(images)
        } else {
            const filtered = images.filter(image => {
                const slug = generateSlug(image);
                return slug.includes(searchTerm.toLowerCase())
            });
            setFilteredBoycot(filtered)
        }
    }, [searchTerm, images])

    return (
        <div className='w-full'>
            {/*search bar */}
            <div className='flex justify-between text-center items-center'>
                {/*search bar */}
                <div className='w-full flex flex-col md:flex-row justify-between items-center gap-4 mb-6'>
                    <h2 className='font-semibold text-4xl text-white'>Boykot Yapılan Markalar</h2>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <ModeToggle />

                        <div className="flex items-center bg-white/10 rounded-full overflow-hidden border border-white/20 shadow-lg w-full max-w-[350px]">
                            <div className="flex items-center justify-center pl-4">
                                <Icon icon="material-symbols:search" width={24} height={24} className='text-white/70' />
                            </div>
                            <input
                                type='text'
                                placeholder='Botkot edilen marka ara...'
                                className='w-full py-3 px-3 bg-transparent text-white placeholder-white/50 focus:outline-none'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className='flex items-center justify-center pr-4'>
                                    <Icon icon="material-symbols:close" width={20} height={20} className='text-white/70' />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {filteredBoycot.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                    {filteredBoycot.map((src, index) => {
                        const slug = generateSlug(src);
                        return (
                            <Link href={`/boykot/${slug}`} key={index} className="relative group aspect-square">
                                <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 z-[-1]"></div>

                                <div className="relative w-full h-full rounded-xl shadow-lg hover:bg-white/90 transition-all duration-300 flex flex-col items-center justify-center dark:bg-black bg-white">
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
            ) : (
                <div className="flex flex-col items-center justify-center py-16 text-white/70">
                    <Icon icon="lucide:search-x" width={48} height={48} className='mb-4' />
                    <p className='text-xl'>&quot;{searchTerm} için sonuç bulunamadı&quot;</p>
                </div>
            )}
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