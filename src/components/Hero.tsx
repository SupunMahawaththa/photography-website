import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative h-screen w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="heading-1 mb-6">
          BEAUTIFULLY FROZEN MOMENTS OF THEIR STORIES
        </h1>
        <p className="subheading text-white/90 max-w-3xl">
          A glimpse of their lovely moments captured in the form of beautiful portraits and wedding photos in Sri Lanka
        </p>
      </div>
    </section>
  )
}

export default Hero 