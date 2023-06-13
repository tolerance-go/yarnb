import { Locale } from '@/i18n-config'
import clsx from 'clsx'
import { useState } from 'react'
import { MenuContent } from './MenuContent'

export const MobileHeader = ({
   activeIndex,
   lang,
}: {
   lang: Locale
   activeIndex: number
}) => {
   const [open, setOpen] = useState(false)
   return (
      <div className='sm:hidden block fixed top-0 inset-x-0 w-full z-50 FullPage'>
         <label className='btn text-xl btn-sm btn-circle hover:bg-transparent bg-transparent border-none swap swap-rotate absolute right-1 top-2 z-10'>
            <input
               type='checkbox'
               className='hidden'
               onChange={() => setOpen(!open)}
            />
            <svg
               className='swap-off fill-current'
               xmlns='http://www.w3.org/2000/svg'
               width='1em'
               height='1em'
               viewBox='0 0 512 512'
            >
               <path d='M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z' />
            </svg>
            <svg
               className='swap-on fill-current'
               xmlns='http://www.w3.org/2000/svg'
               width='1em'
               height='1em'
               viewBox='0 0 512 512'
            >
               <polygon points='400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49' />
            </svg>
         </label>
         <ul
            style={{
               height: open ? '35vh' : 0,
            }}
            className={clsx(
               'flex overflow-hidden transition-all flex-col justify-center items-center FullPage__menu flex-nowrap space-y-4',
               open ? 'opacity-100' : 'opacity-0',
            )}
         >
            <MenuContent lang={lang} activeIndex={activeIndex} />
         </ul>
      </div>
   )
}
