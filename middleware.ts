import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { i18n } from './i18n-config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
   // Negotiator expects plain object so we need to transform headers
   const negotiatorHeaders: Record<string, string> = {}
   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

   // Use negotiator and intl-localematcher to get best locale
   let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
   // @ts-ignore locales are readonly
   const locales: string[] = i18n.locales

   const lang = request.cookies.get('lang')?.value

   return lang === 'zh-CN'
      ? lang
      : matchLocale(languages, locales, i18n.defaultLocale)
}

export function middleware(request: NextRequest) {
   // Skip next internal requests
   if (
      request.nextUrl.pathname.startsWith('/_next') ||
      request.nextUrl.pathname.startsWith('/_assets')
   )
      return

   // Check if there is any supported locale in the pathname
   const pathname = request.nextUrl.pathname
   const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
         !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
   )

   // Let's redirect if there is no locale
   if (pathnameIsMissingLocale) {
      const locale = getLocale(request)
      return NextResponse.redirect(
         new URL(`/${locale}/${pathname}`, request.url),
      )
   }
}

export const config = {
   // We can enable redirect just from root
   // matcher: "/"
}
