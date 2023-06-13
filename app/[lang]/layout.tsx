import { CookiesProviderWrapper } from '@/components/CookiesProviderWrapper'
import '@/components/FullPage/index.scss'
import { LocaleContextProvider } from '@/components/LocaleContext'
import { MobileDisable } from '@/components/MobileDisable'
import '@/components/TimeLine/index.scss'
import { Locale } from '@/i18n-config'
import './globals.css'

export default function RootLayout({
   children,
   params,
}: {
   children: React.ReactNode
   params: { lang: Locale }
}) {
   const theme = 'dark'

   return (
      <html
         lang={params.lang}
         className='dark'
         style={{
            backgroundColor: theme === 'dark' ? '#000' : '#fff',
         }}
      >
         <head />
         <body
            style={{
               backgroundColor: theme === 'dark' ? '#000' : '#fff',
            }}
         >
            <MobileDisable>
               <CookiesProviderWrapper>
                  <LocaleContextProvider lang={params.lang}>
                     {children}
                  </LocaleContextProvider>
               </CookiesProviderWrapper>
            </MobileDisable>
         </body>
      </html>
   )
}
