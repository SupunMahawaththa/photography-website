'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const slides = [
  {
    id: 1,
    image: '/images/slider/slide5.jpg',
    alt: 'Wedding photography 5',
    orientation: 'landscape'
  },
  {
    id: 2,
    image: '/images/slider/slide7.jpg',
    alt: 'Wedding photography 7',
    orientation: 'portrait'
  },
  {
    id: 3,
    image: '/images/slider/slide3.jpg',
    alt: 'Wedding photography 3',
    orientation: 'portrait'
  },
  {
    id: 4,
    image: '/images/slider/slide1.jpg',
    alt: 'Wedding photography 1',
    orientation: 'portrait'
  },
  {
    id: 5,
    image: '/images/slider/slide4.jpg',
    alt: 'Wedding photography 4',
    orientation: 'landscape'
  },
  {
    id: 6,
    image: '/images/slider/slide6.jpg',
    alt: 'Wedding photography 6',
    orientation: 'landscape'
  },
  {
    id: 7,
    image: '/images/slider/slide2.jpg',
    alt: 'Wedding photography 2',
    orientation: 'portrait'
  },
  {
    id: 8,
    image: '/images/slider/slide8.jpg',
    alt: 'Wedding photography 8',
    orientation: 'portrait'
  }
]

const ImageSlider = () => {
  const [imagesLoadedCount, setImagesLoadedCount] = useState(0)
  const [forceShow, setForceShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setForceShow(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const allLoaded = imagesLoadedCount === slides.length || forceShow;
  const handleImageLoaded = () => {
    setImagesLoadedCount((prev) => prev + 1);
  };

  return (
    <section className="relative w-full bg-white mt-20 pt-12 pb-12">
      <div className="max-w-[1800px] mx-auto relative">
        {!allLoaded ? (
          // Skeleton loader for carousel
          <div className="w-full relative">
            <div className="flex items-center justify-center min-h-[300px] md:min-h-[550px] gap-2 md:gap-4 overflow-hidden">
              {/* Skeleton slides - mix of landscape and portrait */}
              {[
                { width: 'w-[420px] md:w-[850px]', height: 'h-[280px] md:h-[550px]' }, // landscape
                { width: 'w-[200px] md:w-[400px]', height: 'h-[280px] md:h-[550px]' }, // portrait
                { width: 'w-[200px] md:w-[400px]', height: 'h-[280px] md:h-[550px]' }, // portrait
                { width: 'w-[420px] md:w-[850px]', height: 'h-[280px] md:h-[550px]' }, // landscape
              ].map((skeleton, index) => (
                <div
                  key={`skeleton-${index}`}
                  className={`relative ${skeleton.width} ${skeleton.height} bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-lg flex-shrink-0`}
                  style={{
                    animationDelay: `${index * 0.2}s`
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          // Actual carousel with fade-in animation
          <div 
            className="opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
            style={{ animationDelay: '0.1s' }}
          >
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full relative"
            >
              <CarouselContent className="-ml-1 md:-ml-2 flex items-center">
                {slides.map((slide, index) => (
                  <CarouselItem 
                    key={slide.id} 
                    className="pl-1 md:pl-2 basis-auto flex items-center"
                  >
                    <div 
                      className="relative flex items-center justify-center min-h-[300px] md:min-h-[550px] opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div 
                        className={`relative ${
                          slide.orientation === 'landscape' 
                            ? 'h-[280px] w-[420px] md:h-[550px] md:w-[850px]' 
                            : 'h-[280px] w-[200px] md:h-[550px] md:w-[400px]'
                        }`}
                      >
                        <Image
                          src={slide.image}
                          alt={slide.alt}
                          fill
                          className="object-cover rounded-lg"
                          sizes={slide.orientation === 'landscape' ? '(max-width: 768px) 600px, 850px' : '(max-width: 768px) 300px, 400px'}
                          priority={slide.id <= 5}
                          onLoadingComplete={handleImageLoaded}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious 
                className="absolute left-4 z-50 bg-white/80 hover:bg-white border-none h-10 w-10 md:h-12 md:w-12 rounded-full"
              />
              <CarouselNext 
                className="absolute right-4 z-50 bg-white/80 hover:bg-white border-none h-10 w-10 md:h-12 md:w-12 rounded-full"
              />
            </Carousel>
          </div>
        )}
      </div>

      <style jsx global>{`
        .embla {
          overflow: visible !important;
        }
        
        .embla__viewport {
          overflow: visible !important;
        }

        .embla__container {
          align-items: center !important;
          min-height: 300px !important;
        }

        @media (min-width: 768px) {
          .embla__container {
            min-height: 550px !important;
          }
        }
      `}</style>
    </section>
  )
}

export default ImageSlider 