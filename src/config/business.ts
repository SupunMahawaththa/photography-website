// Business Configuration
// Update these values to change your business information and map location

export const businessConfig = {
  // Business Information - Update these values directly
  name: 'Lahiru Laddusinghe Photography',
  address: '123 Your Street Name, Your City, Your State 12345, Your Country', // 👈 Change this to your actual address
  city: 'Your City', // 👈 Change this to your city
  state: 'Your State', // 👈 Change this to your state/province
  postalCode: '12345', // 👈 Change this to your postal code
  country: 'Your Country', // 👈 Change this to your country
  email: 'your-email@domain.com', // 👈 Change this to your email
  phone: '+1 (555) 123-4567', // 👈 Change this to your phone number
  
  // Map Configuration
  mapZoom: 15, // You can adjust zoom level (10-20)
}

// Generate Google Maps Embed URL
export const generateMapEmbedUrl = (address: string, zoom: number = 15): string => {
  const encodedAddress = encodeURIComponent(address)
  return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${encodedAddress}&zoom=${zoom}`
}

// Fallback map URL (using current implementation if no API key)
export const getFallbackMapUrl = (): string => {
  return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8351288872443!2d144.95373431531755!3d-37.8162791797518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato%2C%20121%20King%20St%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sau!4v1672000000000!5m2!1sen!2sau"
} 