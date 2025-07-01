import Image from 'next/image'

// This will be replaced with data from Strapi later
const galleryItems = [
  {
    id: 1,
    title: 'SANDALI & LAHIRU',
    image: '/images/gallery/wedding-1.jpg',
  },
  {
    id: 2,
    title: 'ANEEKA & STEPHAN',
    image: '/images/gallery/wedding-2.jpg',
  },
  {
    id: 3,
    title: 'NISHADI & HAREN',
    image: '/images/gallery/wedding-3.jpg',
  },
  {
    id: 4,
    title: 'HIRUNI & AKILA',
    image: '/images/gallery/couple-1.jpg',
  },
  {
    id: 5,
    title: 'KELLY',
    image: '/images/gallery/portrait-1.jpg',
  },
  {
    id: 6,
    title: 'ALLY & CASEY',
    image: '/images/gallery/couple-2.jpg',
  },
]

const Gallery = () => {
  return (
    <section id="gallery" className="py-20">
      <div className="container-custom">
        <h2 className="heading-2 mb-16">FEATURED STORIES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
            <div key={item.id} className="group relative aspect-[3/4] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-white text-xl tracking-wider">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery 