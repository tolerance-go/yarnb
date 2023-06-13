'use client'

import ReactFullpage from '@fullpage/react-fullpage'
import { useState } from 'react'
import { useLocaleContext } from '../LocaleContext'
import { MenuContent, originalPages } from './MenuContent'
import { MobileHeader } from './MobileHeader'

declare global {
   var fullpage_api: {
      moveTo: (index: number) => void
      getActiveSection: () => { index: () => number }
   }
}

export const FullPage = () => {
   const { lang } = useLocaleContext()

   const [activeIndex, setActiveIndex] = useState(0)

   const Menu = () => (
      <>
         <div className='hidden sm:block fixed top-0 inset-x-0 w-full z-50 FullPage'>
            <ul className='flex justify-center p-5 items-center space-x-10 FullPage__menu flex-wrap'>
               <MenuContent lang={lang} activeIndex={activeIndex} />
            </ul>
         </div>
         <MobileHeader lang={lang} activeIndex={activeIndex} />
      </>
   )

   return (
      <>
         <Menu />
         <ReactFullpage
            {...{
               credits: { enabled: false },
            }}
            navigation
            onLeave={(origin, destination, direction) => {
               setActiveIndex(destination.index)
            }}
            lazyLoading
            render={() => (
               <ReactFullpage.Wrapper>
                  {originalPages.map(({ page, text }) => (
                     <div
                        key={text}
                        data-anchor={text}
                        className='section relative'
                     >
                        {page}
                     </div>
                  ))}
               </ReactFullpage.Wrapper>
            )}
         />
      </>
   )
}
