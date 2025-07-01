import Header from '@/components/Header'

export default function AboutMeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
    </>
  )
} 