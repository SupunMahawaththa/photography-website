'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'



interface GallerySliderProps {
  images: string[]
  categoryTitle: string
  isInitialLoad?: boolean
}

const GallerySlider = ({ images, categoryTitle, isInitialLoad = false }: GallerySliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [imagesLoadedCount, setImagesLoadedCount] = useState(0)
  const [forceShow, setForceShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setForceShow(true), 800)
    return () => clearTimeout(timer)
  }, [])

  // Preload adjacent images in lightbox for faster navigation
  useEffect(() => {
    if (isLightboxOpen) {
      const preloadImage = (src: string) => {
        const img = document.createElement('img')
        img.src = src
        // Optional: Add error handling
        img.onerror = () => console.warn('Failed to preload image:', src)
      }

      // Aggressive preloading: preload 6 images total (3 in each direction)
      const imagesToPreload = []
      
      for (let offset = -3; offset <= 3; offset++) {
        if (offset === 0) continue // Skip current image
        
        let targetIndex = lightboxIndex + offset
        
        // Handle wrapping around for circular navigation
        if (targetIndex < 0) {
          targetIndex = images.length + targetIndex
        } else if (targetIndex >= images.length) {
          targetIndex = targetIndex - images.length
        }
        
        if (images[targetIndex]) {
          imagesToPreload.push(images[targetIndex])
        }
      }

      // Preload all identified images
      imagesToPreload.forEach(src => preloadImage(src))
    }
  }, [isLightboxOpen, lightboxIndex, images])

  // Navigation functions for main slider
  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
  }

  // Lightbox functions
  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const goToNextInLightbox = () => {
    setLightboxIndex(lightboxIndex === images.length - 1 ? 0 : lightboxIndex + 1)
  }

  const goToPreviousInLightbox = () => {
    setLightboxIndex(lightboxIndex === 0 ? images.length - 1 : lightboxIndex - 1)
  }

  // Calculate visible images with responsive count
  const getVisibleImages = () => {
    const startIndex = currentIndex
    const visibleImages = []
    // Show 4 images by default
    const visibleCount = 4
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % images.length
      visibleImages.push({ src: images[index], index })
    }
    
    return visibleImages
  }

  const visibleImages = getVisibleImages();
  const allLoaded = imagesLoadedCount === visibleImages.length || forceShow;

  const handleImageLoaded = () => {
    setImagesLoadedCount((prev) => prev + 1);
  };

  return (
    <>
      {/* Main Gallery Slider */}
      <div className="relative max-w-6xl mx-auto min-h-[200px] md:min-h-[280px]">
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Previous images"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Next images"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Images Grid */}
        <div className="overflow-hidden rounded-lg">
          {!allLoaded && (
            <div className="flex justify-center items-center gap-1 md:gap-2 min-h-[200px] md:min-h-[280px]">
              {[...Array(4)].map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="flex-shrink-0 h-[200px] md:h-[280px] bg-gray-200 rounded-lg skeleton-shimmer"
                  style={{
                    width: idx % 2 === 0 ? '160px' : '120px',
                  }}
                />
              ))}
            </div>
          )}
          <div 
            key={currentIndex}
            className={`flex justify-center items-center gap-1 md:gap-2 min-h-[200px] md:min-h-[280px] ${!allLoaded ? 'hidden' : ''}`}
            style={{ 
              flexWrap: 'nowrap'
            }}
          >
            {visibleImages.map((image, idx) => (
              <div
                key={`${image.index}-${idx}`}
                className="group relative overflow-hidden rounded-lg cursor-pointer flex-shrink-0 h-[200px] md:h-[280px] transition-all duration-300 ease-in-out"
                style={{
                  animation: `slideInFade 0.4s ease-out forwards ${idx * 0.1}s`,
                  opacity: 0
                }}
                onClick={() => openLightbox(image.index)}
              >
                <Image
                  src={image.src}
                  alt={`${categoryTitle} ${image.index + 1}`}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 200px, 280px"
                  className="object-cover h-full w-auto transition-all duration-500 group-hover:scale-110"
                  onLoadingComplete={handleImageLoaded}
                />
                
                {/* Overlay with Eye Icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gray-800' 
                  : 'bg-gray-300 hover:bg-gray-500'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-60 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={goToPreviousInLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-60 w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
            aria-label="Previous image"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNextInLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-60 w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
            aria-label="Next image"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 z-60 bg-black/50 text-white px-4 py-2 rounded-full">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Main Image */}
          <div className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center p-4">
            <div className="relative w-full h-full">
              <Image
                src={images[lightboxIndex]}
                alt={`${categoryTitle} ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={closeLightbox}
          />
        </div>
      )}

      {/* CSS for smooth slide transitions and loading animations */}
      <style jsx>{`
        @keyframes slideInFade {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .skeleton-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </>
  )
}

export default GallerySlider 