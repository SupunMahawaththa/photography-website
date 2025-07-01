'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const categories = [
  {
    id: 1,
    title: 'EVENTS',
    image: '/images/categories/events.jpg',
    link: '/gallery#event-photography',
  },
  {
    id: 2,
    title: 'WEDDINGS',
    image: '/images/categories/weddings.jpg',
    link: '/gallery#wedding-photography',
  },
  {
    id: 3,
    title: 'COMMERCIAL',
    image: '/images/categories/commercial.jpg',
    link: '/gallery#commercial-photography',
  },
  {
    id: 4,
    title: 'PORTRAITS',
    image: '/images/categories/portraits.jpg',
    link: '/gallery#portrait-photography',
  },
]

const About = () => {
  const [imagesLoadedCount, setImagesLoadedCount] = useState(0)
  const [forceShow, setForceShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setForceShow(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const allLoaded = imagesLoadedCount === categories.length || forceShow;
  const handleImageLoaded = () => {
    setImagesLoadedCount((prev) => prev + 1);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="heading-1 mb-8">
          I'M KNOWN FOR CAPTURING INTIMATE MOMENTS AS TIMELESS PIECES OF ART
        </h2>
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-[16px] leading-[31px] text-[#7e7e7c] text-center font-[200] mb-5">
            Among the best photographers in Sri Lanka, I'm Lahiru Laddusinghe, a passionate pre-wedding shoot photographer, 
            a model photographer, a portrait photographer, and I humbly recognize myself to be one of the best wedding photographers 
            in Sri Lanka. I love to see how happily you embrace it when I balance the perfect harmony between your story and my photography.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {!allLoaded ? (
            // Skeleton loaders
            Array.from({ length: 4 }).map((_, index) => (
              <div 
                key={index}
                className="aspect-[4/3] overflow-hidden bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]"
                style={{
                  animation: 'shimmer 1.5s ease-in-out infinite',
                  animationDelay: `${index * 0.1}s`
                }}
              />
            ))
          ) : (
            // Actual categories with animation
            categories.map((category, index) => (
              <Link
                key={category.id}
                href={category.link}
                className="group relative aspect-[4/3] overflow-hidden opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{
                  animationDelay: `${index * 0.15}s`
                }}
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  onLoadingComplete={handleImageLoaded}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/40">
                  <h3 className="text-white text-2xl md:text-3xl font-light tracking-wider">
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default About 