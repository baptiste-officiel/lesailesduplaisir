import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'


export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-main'
})


export const clash = localFont({
    src: [
      {
        path: './clash_display/ClashDisplay-Variable.ttf',
      },
      {
        path: './clash_display/ClashDisplay-Variable.woff',
      },
      {
        path: './clash_display/ClashDisplay-Variable.woff2',
      },
    ],
    variable: '--font-title'
  })