import Image from 'next/image'
import Link from 'next/link'
import { businessConfig } from '@/config/business'

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
]

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-800 py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-light mb-4">CONTACT INFO</h3>
            <p className="mb-2">
              <Link href={`mailto:${businessConfig.email}`} className="hover:text-gray-600 transition-colors">
                {businessConfig.email}
              </Link>
            </p>
            <p>{businessConfig.phone}</p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-xl font-light mb-4">QUICK LINKS</h3>
            <nav className="space-y-2">
              <Link href="/" className="block hover:text-gray-600 transition-colors">
                Home
              </Link>
              <Link href="/gallery" className="block hover:text-gray-600 transition-colors">
                Gallery
              </Link>
              <Link href="/about-me" className="block hover:text-gray-600 transition-colors">
                About Me
              </Link>
              <Link href="/contact" className="block hover:text-gray-600 transition-colors">
                Contact Me
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-light mb-4">FOLLOW ME</h3>
            <div className="flex justify-center md:justify-end gap-6">
              {socialLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="hover:text-gray-600 transition-colors"
                  aria-label={link.label}
                >
                  <Image
                    src={link.icon}
                    alt={link.label}
                    width={24}
                    height={24}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-6 text-center text-sm text-gray-500">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>
          
          {/* Mobile: 3 rows */}
          <div className="block md:hidden space-y-1">
            <p>Copyright © 2025 Lahiru Laddusinghe Photography</p>
            <p>All Rights Reserved</p>
            <p>Design & Code by Supun Mahawaththa</p>
          </div>
          
          {/* Desktop: Single line */}
          <p className="hidden md:block">Copyright © 2025 Lahiru Laddusinghe Photography | All Rights Reserved | Design & Code by Supun Mahawaththa</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 