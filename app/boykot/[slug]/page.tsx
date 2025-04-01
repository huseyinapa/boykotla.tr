"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { ModeToggle } from '@/app/_components/ModToggle';

export default function BoykotDetail({ params }: { params: { slug: string } }) {
    const { slug } = params;

    // Tüm boykot listesi
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

    // Slugdan görüntülenecek resmi bul
    const matchingImage = images.find(image => {
        const imageSlug = image.split('/').pop()?.replace(/\.(png|jpg|jpeg)/, '')?.toLowerCase() || '';
        return imageSlug === slug;
    });

    // Slugdan title oluşturma - tüm '-' ve '_' karakterlerini boşluklara çevir
    const formatTitle = (slug) => {
        // Regex ile - ve _ karakterlerini boşluğa çevir ve ilk harfleri büyük yap
        return slug
            .replace(/[-_]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Fake veri oluşturucu fonksiyon
    const generateFakeData = (brandName) => {
        // Şirket tipleri
        const companyTypes = ['medya kuruluşu', 'otomotiv şirketi', 'perakendeci', 'restoran zinciri', 'teknoloji şirketi', 'yayınevi'];
        // Rastgele şirket tipi seç
        const companyType = companyTypes[Math.floor(Math.random() * companyTypes.length)];

        // Tarihçe bölümleri
        const historyParts = [
            `${brandName}, ${1960 + Math.floor(Math.random() * 30)}'lı yıllarda kurulmuş köklü bir ${companyType} olarak faaliyetlerine başlamıştır. Başlangıçta küçük ölçekli bir girişim olarak yola çıkan firma, zamanla büyüyerek sektörünün önde gelen isimlerinden biri haline gelmiştir.`,

            `Yıllar içinde ${brandName}, gerek ürün çeşitliliği gerekse pazar payı açısından önemli bir büyüme göstermiştir. Özellikle ${1990 + Math.floor(Math.random() * 20)} yılından sonra uluslararası pazarlara açılma stratejisi izleyen marka, global arenada da tanınırlık kazanmıştır.`,

            `Son 10 yıl içerisinde ${brandName}'in kurumsal politikaları ve iş uygulamaları, tüketici hakları örgütlerinin ve aktivistlerin dikkatini çekmeye başlamıştır. Şirketin belirli bölgelerdeki faaliyetleri ve ticari ortaklıkları soru işaretleri yaratmaktadır.`
        ].join(' ');

        // Tartışmalı faaliyetler (şirket tipine göre)
        let controversialActivities = "";
        if (companyType === 'medya kuruluşu') {
            controversialActivities = `${brandName}, son dönemde yayın politikası ve içerik stratejisiyle tartışmaların odağında yer almaktadır. Taraflı yayıncılık, manipülatif içerik üretimi ve belirli çıkar gruplarını destekleyen bir yayın çizgisi izlemekle eleştirilmektedir. Özellikle uluslararası çatışma bölgelerindeki olaylara ilişkin haberlerde tek taraflı bakış açısı sunması, kamuoyunun doğru bilgilendirilmesi ilkesine aykırı bulunmaktadır.`;
        } else if (companyType === 'otomotiv şirketi') {
            controversialActivities = `${brandName}, emisyon değerleri konusunda şeffaf olmamak, çevresel etki değerlendirmelerinde yetersiz kalmak ve üretim tesislerinde işçi hakları ihlalleri yapmakla suçlanmaktadır. Ayrıca şirketin belirli ülkelerdeki fabrikalarında sürdürülebilirlik standartlarına uymadığı ve yerel topluluklara zarar verdiği iddiaları bulunmaktadır.`;
        } else if (companyType === 'perakendeci') {
            controversialActivities = `${brandName}'in tedarik zincirinde etik olmayan uygulamalar tespit edilmiştir. Şirketin çalışma koşulları standartların altında olan üreticilerle çalıştığı, adil ticaret prensiplerini göz ardı ettiği ve yerel ekonomilere zarar verdiği belgelenmiştir. Ayrıca şirketin çevresel sürdürülebilirlik konusundaki taahhütlerinin yetersiz kaldığı görülmektedir.`;
        } else if (companyType === 'restoran zinciri') {
            controversialActivities = `${brandName}, gıda tedarik süreçlerinde şeffaflık eksikliği, sürdürülebilir olmayan tarım uygulamalarını destekleme ve işçi haklarını ihlal eden tedarikçilerle çalışma gibi konularda eleştirilmektedir. Şirketin gıda atığı politikaları ve çevresel ayak izi de endişe verici boyutlara ulaşmıştır.`;
        } else {
            controversialActivities = `${brandName}'in kurumsal sosyal sorumluluk politikalarının sadece göstermelik olduğu, gerçekte sürdürülebilirlik ve etik iş uygulamaları konusunda ciddi eksiklikleri bulunduğu tespit edilmiştir. Şirketin finansal yapısı ve ortaklık ilişkileri de şeffaflıktan uzak olarak değerlendirilmektedir.`;
        }

        // Boykot çağrısı bölümü
        const boycottCall = `Bu nedenlerle ${brandName}, ${2022 + Math.floor(Math.random() * 3)} yılından bu yana tüketici hakları savunucuları, çevre aktivistleri ve etik tüketim hareketleri tarafından boykot listesine alınmıştır. Boykot, şirketin politikalarını değiştirmesi ve daha etik, sürdürülebilir ve şeffaf bir iş modeli benimsemesi için baskı oluşturmayı amaçlamaktadır.`;

        // Tam açıklama
        const fullDescription = [historyParts, controversialActivities, boycottCall].join('\n\n');

        // Kısa açıklama
        const shortDescriptions = [
            `${brandName}, tartışmalı iş uygulamaları ve etik olmayan ticari ilişkileri nedeniyle ${2022 + Math.floor(Math.random() * 3)} yılından bu yana boykot listesinde yer almaktadır.`,
            `Türkiye'nin önde gelen ${companyType}larından biri olan ${brandName}, son dönemdeki politikaları ve şeffaf olmayan iş uygulamaları sebebiyle tüketici hareketleri tarafından boykot edilmektedir.`,
            `${brandName}, uluslararası bağlantıları ve etik dışı finansal yapısı nedeniyle etik tüketim hareketi tarafından boykot listesine alınmıştır.`,
            `Bir ${companyType} olarak ${brandName}, tartışmalı şirket politikaları ve insan haklarına aykırı uygulamaları nedeniyle tüketici örgütleri tarafından boykot edilmektedir.`
        ];

        // Rastgele kısa açıklama seç
        const shortDescription = shortDescriptions[Math.floor(Math.random() * shortDescriptions.length)];

        // Olası boykot nedenleri
        const allReasons = [
            "Filistin'deki insani krizi görmezden gelen açıklamaları",
            "İsrail ile devam eden ticari ilişkileri",
            "Sorunlu bölgelerdeki yatırımları",
            "Çalışanlarına karşı etik olmayan iş uygulamaları",
            "Çevresel sorunlara katkıda bulunan üretim süreçleri",
            "Yerel üreticilere zarar veren pazar stratejileri",
            "Tartışmalı politik figürlere sponsorluk yapması",
            "Manipülatif medya içeriği oluşturması",
            "Veri gizliliği ihlalleri",
            "Yüksek karbon ayak izi",
            "Adil ticaret prensiplerini ihlal etmesi",
            "Şeffaf olmayan tedarik zinciri",
            "İnsan hakları ihlallerine göz yuman politikaları",
            "Çocuk işçi çalıştıran tedarikçilerle iş birliği",
            "Yerel toplulukların kaynaklarını sömüren projeleri",
            "Vergi kaçırma ve offshore hesap kullanımı"
        ];

        // 3-5 neden rastgele seç
        const reasonCount = Math.floor(Math.random() * 3) + 3; // 3, 4 veya 5 neden
        const selectedReasons = [];

        while (selectedReasons.length < reasonCount) {
            const randomIndex = Math.floor(Math.random() * allReasons.length);
            const reason = allReasons[randomIndex];

            if (!selectedReasons.includes(reason)) {
                selectedReasons.push(reason);
            }
        }

        return {
            title: brandName,
            companyType,
            description: shortDescription,
            fullDescription: fullDescription,
            reasons: selectedReasons,
            establishmentYear: 1960 + Math.floor(Math.random() * 60), // 1960-2020 arası
            headquarters: ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Konya'][Math.floor(Math.random() * 5)],
            boykotStartDate: `${2022 + Math.floor(Math.random() * 3)}`
        };
    };

    const [boykotData, setBoykotData] = useState(generateFakeData(formatTitle(slug)));

    // // API verisi çekme simülasyonu
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // Gerçek uygulamada burada API çağrısı olacak
    //             // const response = await fetch(`http://localhost:3000/api/boycot/${slug}`);
    //             // const data = await response.json();
    //             // setBoykotData(data);
    //         } catch (error) {
    //             console.error("Veri çekme hatası:", error);
    //         }
    //     };

    //     fetchData();
    // }, [slug]);

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className='flex items-center justify-between'>
                <Link href="/" className="flex items-center text-blue-500 hover:text-blue-700 mb-6">
                    <Icon icon="material-symbols:arrow-back" width={24} height={24} className="mr-2" />
                    Tüm Boykotlar
                </Link>
                <>
                    <ModeToggle />
                </>
            </div>

            <div className="dark:bg-black bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="mb-6">
                    <div className="w-full flex justify-center mb-6">
                        {matchingImage ? (
                            <div className="relative w-full h-auto">
                                <div className="relative">
                                    <Image
                                        src={`/images${matchingImage}`}
                                        alt={boykotData.title}
                                        width={800}
                                        height={500}
                                        className="object-contain max-h-96 w-full "
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-full h-96 bg-gray-200 rounded-xl relative">
                                <Icon icon="mdi:image-off" width={64} height={64} className="dark:text-white/70 text-gray-400" />
                                <div className="absolute bottom-2 right-2 dark:bg-black bg-opacity-70 px-3 py-1 rounded-lg shadow-md">
                                    <span className="font-bold dark:text-white/70 text-gray-800">{boykotData.title}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="w-full">
                        <div className="flex items-center  justify-between gap-y-2.5">
                            <h1 className="text-3xl dark:text-white/90 font-bold">{boykotData.title}</h1>
                            {/* <span className="ml-3 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-red-200 flex items-center">
                                <Icon icon="carbon:warning-square-filled" className="mr-1" width={14} />
                                Boykot Listesinde
                            </span> */}
                            <div className="text-sm dark:text-white/70 text-gray-500 flex items-center">
                                <Icon icon="carbon:time" className="mr-1" width={16} />
                                Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
                            </div>
                        </div>


                        <p className="dark:text-white/70 text-gray-700 mb-6 text-lg font-medium">{boykotData.description}</p>

                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
                            <h2 className="text-xl font-semibold mb-3 flex items-center text-red-700">
                                <Icon icon="carbon:warning" className="mr-2" width={20} />
                                Boykot Nedenleri
                            </h2>
                            <ul className="space-y-2">
                                {boykotData.reasons.map((reason, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-red-500 mr-2 mt-1">•</span>
                                        <span className="text-gray-700">{reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}