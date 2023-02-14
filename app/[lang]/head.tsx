import { cookies } from 'next/headers'

export default function Head() {
   const nextCookies = cookies()

   const lang = nextCookies.get('lang')?.value === 'zh-CN' ? 'zh-CN' : 'en'

   // 不能直接出现在 title 标签内，先赋值
   const titleContent =
      lang === 'zh-CN' ? '杨斌的在线简历' : "yarnb's online resume"

   return (
      <>
         <title>{titleContent}</title>
         <meta content='width=device-width, initial-scale=1' name='viewport' />
         <meta name='description' content={titleContent} />
         <link rel='icon' href='/_assets/favicon.ico' />
      </>
   )
}
