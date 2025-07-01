'use client'

import Image from 'next/image'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const photographerPhotos = [
  {
    id: 1,
    image: '/images/about/about-1.jpg',
    alt: 'Photographer in action'
  },
  {
    id: 2,
    image: '/images/about/about-2.jpg',
    alt: 'Photographer portrait'
  },
  {
    id: 3,
    image: '/images/about/about-3.jpg',
    alt: 'Behind the scenes'
  },
  {
    id: 4,
    image: '/images/about/about-4.jpg',
    alt: 'Photographer lifestyle'
  }
]

const testimonials = [
  {
    id: 1,
    text: "LAHIRU LADDUSINGHE PHOTOGRAPHY is the best! I have no words to say my happiness when I saw my wedding albums and the video. It was unbelievable. He has took so many emotional and remarkable moments.It was very easy to work with him. He did an amazing job and we couldn't have someone better that him. I would like to highly recommend his work and his service as a professional photographer.we don't have words to express our gratitude to you Lahiru. Thank you so much for the life time memories. ❤️",
    author: "BHUSHA & UDARA"
  },
  {
    id: 2,
    text: "He is the most humble and creative photographer that I have ever met Easy going and chilled out. He can capture the best candid shots and make you look exceptionally beautiful. He made mine and Shehans big day extra special ❤️ All the best for a photogenic future for 🤞",
    author: "SAMARA & SHEHAN"
  }
]

export default function AboutMePage() {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)
  const [imagesLoadedCount, setImagesLoadedCount] = useState(0)
  const [testimonialsLoaded, setTestimonialsLoaded] = useState(false)
  const [forceShow, setForceShow] = useState(false)

  const allLoaded = imagesLoadedCount === photographerPhotos.length || forceShow;

  useEffect(() => {
    const timer = setTimeout(() => setForceShow(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleImageLoaded = () => {
    setImagesLoadedCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (!api) return

    // Auto slide every 5 seconds
    const autoSlide = setInterval(() => {
      api.scrollNext()
    }, 5000)

    // Clean up on component unmount
    return () => clearInterval(autoSlide)
  }, [api])

  useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Handle testimonials loading
  useEffect(() => {
    setTestimonialsLoaded(true)
  }, [])

  return (
    <main>
      {/* About Me Text Section */}
      <section className="mt-20 pt-12 pb-12 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="heading-1 mb-12">About Me</h1>
            
            <div className="space-y-6 text-[16px] leading-[31px] text-[#7e7e7c] font-[200]">
              <p>
                I've been very fortunate to have been a full time wedding photographer in Sri Lanka for the last 8 years. I began photography as a passion when I was 20 while I was exploring my creative journey and eventually it became clear that photography was going to be the way forward for me to fulfill my artistic potential on a professional full time basis, all the while being involved in some of the most meaningful occasions of life. It is my privilege to create beautifully finished photographs that match both the styles and personalities of the people in them. I pride myself on my versatility and adaptability, the ability to photograph your special moments in a variety of styles including candid, contemporary, traditional or a combination of all three.
              </p>
              
              <p>
                My wedding coverage is largely documentary in approach; I'm not staging a styled shoot but rather observing events and emotions unfolding naturally. What transpires between people on a wedding day is most important to me. I'm quiet and observant by nature but can effectively guide when needed, positioning my subjects with beautiful flattering natural light and allowing for genuine interactions, even during portrait sessions.
              </p>
              
              <p>
                My approach to portraiture ranges from classic and timeless to vibrant and dynamic but never overproduced. Every image my clients receive is individually edited by me in a style that is organic, understated and timeless. I do not subscribe to one rigid style or palette but instead take inspiration from my clients first and foremost and the mood and aesthetic of the day and location, aiming for elegant authenticity. I hope that as you browse my portfolios you'll be able to not only appreciate the use of natural light and composition but also feel the emotions and joy that were present in those beautiful moments.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center gap-6 mt-12">
              <a href="#" className="hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path fill="#E1306C" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          {!allLoaded ? (
            // Skeleton loaders
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, idx) => (
                <div key={`skeleton-${idx}`} className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <div className="w-full h-full bg-gray-200 rounded-lg skeleton-shimmer"></div>
                </div>
              ))}
            </div>
          ) : (
            // Actual images with fade-in animation
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {photographerPhotos.map((photo, idx) => (
                <div 
                  key={photo.id} 
                  className="relative aspect-[3/4] overflow-hidden rounded-lg opacity-0"
                  style={{
                    animation: `fadeInUp 0.6s ease-out forwards ${idx * 0.15}s`
                  }}
                >
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    onLoadingComplete={handleImageLoaded}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="heading-1 text-center mb-16">
            NOTES FROM MY DELIGHTED CLIENTS 🥰
          </h2>
          
          <div className="max-w-5xl mx-auto relative">
            {!testimonialsLoaded ? (
              // Testimonials skeleton loader
              <div className="text-center px-16 py-8">
                <div className="mb-8 flex justify-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                </div>
                
                {/* Text skeleton */}
                <div className="space-y-3 mb-8">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse max-w-4xl mx-auto" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse max-w-3xl mx-auto" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse max-w-5xl mx-auto" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse max-w-2xl mx-auto" />
                </div>
                
                {/* Author skeleton */}
                <div className="h-4 bg-gray-200 rounded animate-pulse max-w-xs mx-auto" />
              </div>
            ) : (
              // Actual testimonials carousel with fade-in animation
              <div 
                className="opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
                style={{ animationDelay: '0.1s' }}
              >
                <Carousel
                  setApi={setApi}
                  opts={{
                    align: "center",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                      <CarouselItem key={testimonial.id}>
                        <div 
                          className="text-center px-16 py-8 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                          style={{ animationDelay: `${index * 0.2}s` }}
                        >
                          <div className="mb-8">
                            <svg className="w-12 h-12 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                            </svg>
                          </div>
                          
                          <p className="text-[14px] leading-[28px] text-[#7e7e7c] text-center font-[200] mb-8">
                            {testimonial.text}
                          </p>
                          
                          <p className="text-sm text-gray-500 tracking-wider">
                            — {testimonial.author}
                          </p>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-gray-100/80 hover:bg-gray-200 border-none h-8 w-8 rounded-full shadow-sm" />
                  <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-gray-100/80 hover:bg-gray-200 border-none h-8 w-8 rounded-full shadow-sm" />
                </Carousel>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="py-4 bg-white">
        <div className="container-custom">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      </div>

      {/* Contact Section - Same as home page */}
      <Contact />
      
      {/* Footer Section - Same as home page */}
      <Footer />

      {/* CSS for loading animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
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
    </main>
  )
} 