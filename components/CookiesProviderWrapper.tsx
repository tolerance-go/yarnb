'use client'

import { PropsWithChildren } from 'react'
import { CookiesProvider } from 'react-cookie'

export const CookiesProviderWrapper = (props: PropsWithChildren) => {
   return <CookiesProvider>{props.children}</CookiesProvider>
}
