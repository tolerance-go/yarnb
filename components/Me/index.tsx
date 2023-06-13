'use client'

import { useLocaleContext } from '../LocaleContext'
import Content from './content.mdx'
import ContentZhCN from './content.zh-CN.mdx'

export const Connect = () => {
   const { lang } = useLocaleContext()

   return (
      <div className='flex justify-center items-center space-x-5 sm:space-x-10'>
         <img
            className='w-[200px] sm:w-[300px] border-[15px]'
            src='/_assets/my.jpg'
         />
         <div className='text-white prose prose-invert lg:prose-xl pr-6 sm:pr-0'>
            {lang === 'en' ? <Content /> : <ContentZhCN />}{' '}
         </div>
      </div>
   )
}
