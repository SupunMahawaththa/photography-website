'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import GallerySlider from '../../components/GallerySlider'

// Gallery data for each category
const galleryCategories = [
  {
    id: 1,
    title: 'Event Photography',
    description: 'I capture the energy, emotion, and unforgettable moments of your special events. From corporate gatherings to celebrations, my event photography in Sri Lanka focuses on documenting authentic interactions and key moments that tell the complete story of your occasion. I blend into the background to capture natural, candid shots while ensuring all important moments are beautifully preserved.',
    images: [
      '/images/gallery/event-photography/ep_L_9.jpg',
      '/images/gallery/event-photography/ep_P_1.jpg',
      '/images/gallery/event-photography/ep_L_2.jpg',
      '/images/gallery/event-photography/ep_P_3.jpg',
      '/images/gallery/event-photography/ep_P_4.jpg',
      '/images/gallery/event-photography/ep_L_5.jpg',
      '/images/gallery/event-photography/ep_P_6.jpg',
      '/images/gallery/event-photography/ep_P_7.jpg',
      '/images/gallery/event-photography/ep_P_8.jpg',
      '/images/gallery/event-photography/ep_P_10.jpg',
      '/images/gallery/event-photography/ep_P_11.jpg',
      '/images/gallery/event-photography/ep_P_12.jpg',
    ]
  },
  {
    id: 2,
    title: 'Wedding Photography',
    description: 'I freeze special moments in just the right time on your big day so that you can pass them down and cherish them in generations to come. Unlike typical wedding photographers in Sri Lanka, I capture the most natural moments through my wedding photography in Sri Lanka. I love to delight my clients with beautiful portraits using natural lighting so that they can recall every moment of their wedding photoshoot with genuine happiness.',
    images: [
      '/images/gallery/wedding-photography/wp_L_1.jpg',
      '/images/gallery/wedding-photography/wp_P_2.jpg',
      '/images/gallery/wedding-photography/wp_L_3.jpg',
      '/images/gallery/wedding-photography/wp_P_4.jpg',
      '/images/gallery/wedding-photography/wp_P_5.jpg',
      '/images/gallery/wedding-photography/wp_L_6.jpg',
      '/images/gallery/wedding-photography/wp_L_7.jpg',
      '/images/gallery/wedding-photography/wp_L_8.jpg',
      '/images/gallery/wedding-photography/wp_L_9.jpg',
      '/images/gallery/wedding-photography/jen-theodore-bfFvK1b6-hA-unsplash.jpg',
    ]
  },
  {
    id: 3,
    title: 'Commercial Photography',
    description: 'I help brands tell their story through compelling visual content that drives engagement and results. My commercial photography services in Sri Lanka include product photography, corporate headshots, and brand imagery. I work closely with businesses to understand their vision and create professional photographs that enhance their marketing efforts and establish a strong visual identity in the marketplace.',
    images: [
      '/images/gallery/commercial-photography/cp_L_1.jpg',
      '/images/gallery/commercial-photography/cp_P_2.jpg',
      '/images/gallery/commercial-photography/cp_P_3.jpg',
      '/images/gallery/commercial-photography/cp_L_4.jpg',
      '/images/gallery/commercial-photography/cp_L_5.jpg',
      '/images/gallery/commercial-photography/cp_P_6.jpg',
      '/images/gallery/commercial-photography/cp_L_7.jpg',
      '/images/gallery/commercial-photography/cp_P_8.jpg',
    ]
  },
  {
    id: 4,
    title: 'Portrait Photography',
    description: 'I create timeless portraits that capture the essence and personality of each individual. My portrait photography sessions focus on bringing out natural expressions and genuine emotions in a comfortable, relaxed environment. Whether for professional headshots, family portraits, or personal branding, I use expert lighting techniques and composition to create stunning images that my clients treasure for years to come.',
    images: [
      '/images/gallery/protrait-photography/pp_P_1.jpg',
      '/images/gallery/protrait-photography/pp_L_2.jpg',
      '/images/gallery/protrait-photography/pp_P_3.jpg',
      '/images/gallery/protrait-photography/pp_P_4.jpg',
      '/images/gallery/protrait-photography/pp_P_5.jpg',
      '/images/gallery/protrait-photography/pp_L_6.jpg',
      '/images/gallery/protrait-photography/pp_L_7.jpg',
      '/images/gallery/protrait-photography/pp_P_8.jpg',
      '/images/gallery/protrait-photography/pp_P_9.jpg',
    ]
  }
]

export default function GalleryPage() {
  // Handle scrolling to specific sections based on hash
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const sectionId = hash.substring(1) // Remove the '#'
      const element = document.getElementById(sectionId)
      if (element) {
        // Immediate scroll on page load to prevent showing top of page first
        const scrollToSection = () => {
          const headerHeight = 100 // Account for site header and some padding
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = Math.max(0, elementPosition - headerHeight)
          
          // Use immediate scroll (no smooth behavior) for initial navigation
          window.scrollTo({
            top: offsetPosition,
            behavior: 'auto' // Changed to 'auto' for immediate scroll
          })
        }

        // Try to scroll immediately
        scrollToSection()
        
        // Also set a small backup delay in case the element isn't positioned yet
        const timeoutId = setTimeout(scrollToSection, 100)
        
        return () => clearTimeout(timeoutId)
      }
    }
  }, [])

  return (
    <main>
      {/* Header with built-in separator */}
      <Header />

      {/* Gallery Sections */}
      <div className="mt-20">
        {galleryCategories.map((category, index) => {
          // Map category titles to section IDs
          const sectionIds = {
            'Event Photography': 'event-photography',
            'Wedding Photography': 'wedding-photography',
            'Commercial Photography': 'commercial-photography',
            'Portrait Photography': 'portrait-photography'
          }
          
          return (
            <section 
              key={category.id}
              id={sectionIds[category.title as keyof typeof sectionIds]}
              className={`${index === 0 ? 'pt-12' : 'pt-20'} pb-20 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
            <div className="container-custom">
              {/* Category Header */}
              <div className="text-center mb-12">
                <h1 className="heading-1 mb-6">{category.title}</h1>
                <div className="max-w-4xl mx-auto">
                  <p className="text-[16px] leading-[31px] text-[#7e7e7c] font-[200]">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Image Slider */}
              <GallerySlider 
                images={category.images} 
                categoryTitle={category.title} 
                isInitialLoad={index === 0}
              />
            </div>
          </section>
          )
        })}
      </div>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  )
} 