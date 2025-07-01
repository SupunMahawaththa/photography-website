import Header from '@/components/Header'
import ImageSlider from '@/components/ImageSlider'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <ImageSlider />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
