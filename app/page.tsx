// Home.js (veya index.js) - Ana Sayfa Düzeltmesi
import Cards from './_components/boykotlar/Cards';
import Footer from './_components/Footer';
import ImageSlider from './_components/ImageSlider'; // Dosya adını düzelttim - Image yerine ImageSlider

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      {/* Background design elements - absolute-top yerine absolute top-0 kullandım */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-10 left-10 w-56 h-56 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main content area */}
      <div className="relative z-10">
        {/* Header section */}

        {/* Main content - always vertical */}
      
        <div className="w-full ">
          <ImageSlider />
        </div>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex flex-col items-center">
            {/* Image Slider - full width and centered */}

            {/* Cards section - below slider with spacing */}
            <div className="w-full max-w-7xl mt-12">
              <Cards />
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}