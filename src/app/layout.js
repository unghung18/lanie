import { Josefin_Sans } from 'next/font/google'
import './globals.css';

import 'swiper/css/zoom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700']
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={josefin.className}>{children}</body>
    </html>
  )
}
