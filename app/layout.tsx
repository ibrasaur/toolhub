import './globals.css'
import Navbar from '../components/Navbar'
import Preloader from '../components/Preloader'

export const metadata = {
  title: 'Student Toolkit Hub',
  description: 'Free tools and courses for students, all in one place.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dark text-white min-h-screen bg-dot-grid relative">
        <Preloader />
        <Navbar />
        <main className="relative z-10 pt-20 px-6 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
