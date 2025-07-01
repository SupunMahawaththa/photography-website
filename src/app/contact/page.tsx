'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { businessConfig, generateMapEmbedUrl, getFallbackMapUrl } from '@/config/business'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})
  const [isSuccessVisible, setIsSuccessVisible] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Generate map URL based on configuration
  const mapUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY 
    ? generateMapEmbedUrl(businessConfig.address, businessConfig.mapZoom)
    : getFallbackMapUrl()

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (submitStatus === 'success') {
      setIsSuccessVisible(true)
      
      // Start fade out after 2.5 seconds
      const fadeTimer = setTimeout(() => {
        setIsSuccessVisible(false)
      }, 2500)
      
      // Completely hide after 3 seconds
      const hideTimer = setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)

      return () => {
        clearTimeout(fadeTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [submitStatus])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const errors: {[key: string]: string} = {}
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Please enter your name'
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      errors.subject = 'Please enter a subject'
    } else if (formData.subject.trim().length < 3) {
      errors.subject = 'Subject must be at least 3 characters'
    }
    
    // Message validation
    if (!formData.message.trim()) {
      errors.message = 'Please enter your message'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters'
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (formData.phone.trim() && !/^[\+]?[\s\-\(\)]*([0-9][\s\-\(\)]*){10,}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number'
    }
    
    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous validation errors
    setValidationErrors({})
    
    // Validate form
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form and clear validation errors after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
        setValidationErrors({})
      } else {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main>
      {/* Header with built-in separator */}
      <Header />

      {/* Map and Contact Info Section */}
      <section className="mt-20 pt-12 pb-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Info - Show first on mobile/tablet */}
            <div className="flex flex-col justify-center lg:order-2">
              <h1 className="heading-1 text-center lg:text-left mb-8">Contact Me</h1>
              <p className="text-gray-600 mb-8 leading-relaxed text-center lg:text-left">
                Contact me for more information about my portrait photography, pre-shoot photography and wedding photography in {businessConfig.city}, and enjoy the best photo shoot experience you ever had.
              </p>

              {/* Contact Details - Hide on mobile/tablet, show on desktop */}
              <div className="space-y-6 hidden lg:block">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 text-gray-600">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">
                    {businessConfig.address}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 text-gray-600">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a href={`mailto:${businessConfig.email}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                    {businessConfig.email}
                  </a>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 text-gray-600">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <a href={`tel:${businessConfig.phone.replace(/\s/g, '')}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                    {businessConfig.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Map - Show second on mobile/tablet */}
            <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden lg:order-1">
              {!mapLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-gray-100">
                  {/* Map icon */}
                  <div className="animate-pulse">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  
                  {/* Loading text */}
                  <p className="text-gray-500 text-sm font-light">Loading map...</p>
                </div>
              )}
              
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
                onLoad={() => setMapLoaded(true)}
                className={`transition-opacity duration-500 ${mapLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>

            {/* Contact Details - Show on mobile/tablet after map */}
            <div className="space-y-6 lg:hidden">
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 text-gray-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  {businessConfig.address}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 text-gray-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href={`mailto:${businessConfig.email}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                  {businessConfig.email}
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 text-gray-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href={`tel:${businessConfig.phone.replace(/\s/g, '')}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                  {businessConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-1 mb-6">Get In Touch</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have a project in mind? I'd love to hear about your photography needs and discuss how we can bring your ideas to life.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 bg-white rounded-lg border transition-colors ${
                      validationErrors.name 
                        ? 'border-red-300 hover:border-red-400 focus:border-red-500 focus-visible:border-red-500' 
                        : 'border-gray-200 hover:border-gray-400 focus:outline-none focus:border-gray-600 focus-visible:border-gray-600'
                    }`}
                    placeholder="Your name"
                  />
                  {validationErrors.name && (
                    <p className="mt-2 text-sm text-red-600">{validationErrors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 bg-white rounded-lg border transition-colors ${
                      validationErrors.email 
                        ? 'border-red-300 hover:border-red-400 focus:border-red-500 focus-visible:border-red-500' 
                        : 'border-gray-200 hover:border-gray-400 focus:outline-none focus:border-gray-600 focus-visible:border-gray-600'
                    }`}
                    placeholder="Your e-mail"
                  />
                  {validationErrors.email && (
                    <p className="mt-2 text-sm text-red-600">{validationErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone and Subject Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 bg-white rounded-lg border transition-colors ${
                      validationErrors.phone 
                        ? 'border-red-300 hover:border-red-400 focus:border-red-500 focus-visible:border-red-500' 
                        : 'border-gray-200 hover:border-gray-400 focus:outline-none focus:border-gray-600 focus-visible:border-gray-600'
                    }`}
                    placeholder="Phone"
                  />
                  {validationErrors.phone && (
                    <p className="mt-2 text-sm text-red-600">{validationErrors.phone}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 bg-white rounded-lg border transition-colors ${
                      validationErrors.subject 
                        ? 'border-red-300 hover:border-red-400 focus:border-red-500 focus-visible:border-red-500' 
                        : 'border-gray-200 hover:border-gray-400 focus:outline-none focus:border-gray-600 focus-visible:border-gray-600'
                    }`}
                    placeholder="Subject"
                  />
                  {validationErrors.subject && (
                    <p className="mt-2 text-sm text-red-600">{validationErrors.subject}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  rows={8}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 bg-white rounded-lg border transition-colors resize-none ${
                    validationErrors.message 
                      ? 'border-red-300 hover:border-red-400 focus:border-red-500 focus-visible:border-red-500' 
                      : 'border-gray-200 hover:border-gray-400 focus:outline-none focus:border-gray-600 focus-visible:border-gray-600'
                  }`}
                  placeholder="Type your message here..."
                />
                {validationErrors.message && (
                  <p className="mt-2 text-sm text-red-600">{validationErrors.message}</p>
                )}
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className={`text-center p-4 bg-green-50 border border-green-200 rounded-lg transition-opacity duration-500 ease-in-out ${
                  isSuccessVisible ? 'opacity-100' : 'opacity-0'
                }`}>
                  <p className="text-green-700 font-medium">✓ Message sent successfully!</p>
                  <p className="text-green-600 text-sm mt-1">Thank you for your message. I'll get back to you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-medium">✗ Failed to send message</p>
                  <p className="text-red-600 text-sm mt-1">Please try again or contact us directly.</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center px-8 py-4 border-2 text-lg font-medium tracking-wider transition-all duration-300 ${
                    isSubmitting
                      ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                      : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      SENDING...
                    </>
                  ) : (
                    'SEND MESSAGE'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
} 