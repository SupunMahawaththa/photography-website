'use client'

import Image from 'next/image'
import Link from 'next/link'

const socialLinks = [
  {
    id: 1,
    icon: '/images/social/facebook.svg',
    href: '#',
    label: 'Facebook',
  },
  {
    id: 2,
    icon: '/images/social/instagram.svg',
    href: '#',
    label: 'Instagram',
  },
  {
    id: 3,
    icon: '/images/social/youtube.svg',
    href: '#',
    label: 'YouTube',
  },
  {
    id: 4,
    icon: '/images/social/flickr.svg',
    href: '#',
    label: 'Flickr',
  },
]

const Contact = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom text-center">
        <h2 className="heading-1 mb-8">Let's create something beautiful together!</h2>
        <p className="text-lg md:text-xl text-gray-600 mb-12">
          I would love to hear about your photography needs and create timeless memories together.
        </p>
        <Link
          href="/contact"
          className="blink-button inline-block border-2 border-gray-900 text-gray-900 px-8 py-4 text-lg tracking-wider hover:bg-gray-900 hover:text-white transition-ease-in-out duration-300"
        >
          CONTACT ME
        </Link>
      </div>
    </section>
  )
}

export default Contact 