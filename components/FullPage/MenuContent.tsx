'use client'

import { Locale } from '@/i18n-config'
import cs from 'clsx'
import { debounce } from 'lodash-es'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { useLocation } from 'react-use'
import { useLocaleContext } from '../LocaleContext'
import { Connect } from '../Me'

const TimeLineFrame = () => {
   const frameRef = useRef<HTMLIFrameElement>(null)
   const { lang } = useLocaleContext()

   useEffect(() => {
      const frame = frameRef.current

      const scrollHandler = debounce((event: Event) => {
         if (!frame || !frame.contentDocument || !frame.contentWindow) return

         const docHeight = frame.contentDocument.body.scrollHeight
         const windowHeight = frame.contentWindow.innerHeight
         const scrollTop = frame.contentWindow.scrollY

         if (Math.abs(docHeight - windowHeight - scrollTop) < 1) {
            fullpage_api.moveTo(3)
         } else if (scrollTop === 0) {
            fullpage_api.moveTo(1)
         }
      }, 200)

      frame?.contentWindow?.addEventListener('scroll', scrollHandler, false)

      return () =>
         frame?.contentWindow?.removeEventListener(
            'scroll',
            scrollHandler,
            false,
         )
   }, [])

   return (
      <iframe
         ref={frameRef}
         className='h-screen w-screen bg-black'
         src={`/${lang}/time-line`}
      ></iframe>
   )
}

export const originalPages = [
   {
      text: 'me',
      zhText: '我',
      page: <Connect />,
   },
   {
      text: 'experience',
      zhText: '经历',
      page: <TimeLineFrame />,
   },
]

export const MenuContent = ({
   activeIndex,
   lang,
}: {
   lang: Locale
   activeIndex: number
}) => {
   const location = useLocation()
   const hash = (location.href as string).split('#')[1]
   const [, setCookie] = useCookies(['lang'])

   return (
      <>
         {originalPages
            .map((item, index) => {
               return (
                  <li key={item.text}>
                     <button
                        className={cs(
                           'underline decoration-dotted underline-offset-4 transition hover:text-white sm:text-xl text-sm',
                           activeIndex === index
                              ? 'text-white'
                              : 'text-gray-500',
                        )}
                        onClick={() => {
                           fullpage_api.moveTo(index + 1)
                        }}
                     >
                        {lang === 'zh-CN' ? item.zhText : item.text}
                     </button>
                  </li>
               )
            })
            .concat(
               <li key={'switch'}>
                  <Link
                     href={`/${lang === 'zh-CN' ? 'en' : 'zh-CN'}${
                        hash ? `#${hash}` : ''
                     }`}
                     className={cs(
                        'text-gray-500 transition hover:text-white sm:text-xl text-sm',
                     )}
                     onClick={() => {
                        setCookie('lang', lang === 'zh-CN' ? 'en' : 'zh-CN', {
                           path: '/',
                        })
                     }}
                  >
                     {lang === 'zh-CN' ? 'En' : '中文'}
                  </Link>
               </li>,
            )}
      </>
   )
}
