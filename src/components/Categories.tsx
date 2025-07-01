import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    id: 1,
    title: 'WEDDINGS',
    image: '/images/categories/weddings.jpg',
    link: '/weddings',
  },
  {
    id: 2,
    title: 'PORTRAITS',
    image: '/images/categories/portraits.jpg',
    link: '/portraits',
  },
  {
    id: 3,
    title: 'COUPLES',
    image: '/images/categories/couples.jpg',
    link: '/couples',
  },
  {
    id: 4,
    title: 'EVENTS',
    image: '/images/categories/events.jpg',
    link: '/events',
  },
  {
    id: 5,
    title: 'COMMERCIAL',
    image: '/images/categories/commercial.jpg',
    link: '/commercial',
  },
  {
    id: 6,
    title: 'FOOD',
    image: '/images/categories/food.jpg',
    link: '/food',
  },
]

const Categories = () => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <h2 className="heading-2 mb-16">PHOTOGRAPHY SERVICES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="group relative aspect-square overflow-hidden"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/50">
                <h3 className="text-white text-2xl md:text-3xl font-light tracking-wider">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories 