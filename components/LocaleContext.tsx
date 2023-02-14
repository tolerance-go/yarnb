'use client'

import { Locale } from 'i18n-config'
import { createContext, PropsWithChildren, useContext } from 'react'

export const defaultLocale: Locale = 'en'

export const LocaleContext = createContext<{
   lang: Locale
}>({
   lang: defaultLocale,
})

export const LocaleContextProvider = ({
   children,
   lang,
}: PropsWithChildren<{
   lang: Locale
}>) => {
   return (
      <LocaleContext.Provider
         value={{
            lang,
         }}
      >
         {children}
      </LocaleContext.Provider>
   )
}

export const useLocaleContext = () => {
   return useContext(LocaleContext)
}
