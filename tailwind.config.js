/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',
   content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      extend: {
         colors: {
            brandtext: {
               200: '#eaebfc',
               300: '#c8c9d9',
               400: '#c8c9d9',
               500: '#eaebfc',
               600: '#a6aec7',
               700: '#737388',
            },
            'raised-border': '#2b2b3c',
         },
      },
   },
   plugins: [
      require('@tailwindcss/typography') /** @tailwindcss/typography@0.5.9 */,
      require('@tailwindcss/line-clamp') /** @tailwindcss/line-clamp@0.4.2 */,
      require('@tailwindcss/forms') /** @tailwindcss/forms@0.5.3 */,
      require('tailwindcss-animate') /** tailwindcss-animate@1.0.5 */,
      require('daisyui'),
   ],
}
