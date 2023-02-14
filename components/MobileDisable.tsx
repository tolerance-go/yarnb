'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import { useMedia } from 'react-media'
import { useLocaleContext } from './LocaleContext'

export const MobileDisable = (props: PropsWithChildren) => {
   const isWide = useMedia({ query: '(min-width: 640px)' })
   const { lang } = useLocaleContext()

   const [mount, setMount] = useState(false)

   useEffect(() => {
      setMount(true)
   }, [])

   if (!mount) return null

   return (
      <>
         {isWide ? (
            props.children
         ) : (
            <div className='p-5 text-center text-gray-300'>
               {lang === 'zh-CN'
                  ? '请使用电脑及现代浏览器访问，推荐 Chrome'
                  : 'Please use PC and a modern browser to access, Chrome is recommended'}
            </div>
         )}
      </>
   )
}
