import { Josefin_Sans } from 'next/font/google';
import './globals.css';

import 'swiper/css/zoom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import ReduxProvider from '../redux/provider';
import AuthProvider from '@/utils/SessionProvider';
import { getServerSession } from 'next-auth';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700']
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {

  const session = await getServerSession();
  return (
    <html lang="en" className=''>
      <ReduxProvider>
        <body className={josefin.className}>
          <AuthProvider session={session}>
            {children}
          </AuthProvider>
        </body>
      </ReduxProvider>
    </html>
  )
}
