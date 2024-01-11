/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        clrTxtPrimary: '#202124',
        clrBgPrimary:'#f6f8fc',
        clrBgPrimaryDark:'#111111',
        clrInput:'#eaf1fb',
        clrInputDark:'#474747',
        clrUnreadDark:'#2c2c2c',
        clrRead:'#f2f6fc',
        clrReadDark:'#161616',
        clrSidebarActive:'#d3e3fd',
        clrSidebarActiveDark:'#595959',
        // clrSidebarHover:'#eaebef',
        // clrSidebarHoverDark:'#414141',
        clrComposeBtn:'#c6e7ff',
        clrStarred:'#efc74b',
        clrTxtSecondary:'#babec1',
        clrTxtSecondaryDark:'#707070',
        clrTxtTertiary:'#444746',
        clrTxtTertiaryDark:'#c0c0c0',
        clrHoverDark:'#e8eaed14',
        clrHover:'#3c404314',
        // clrPreviewBorder:'#808080'


      }
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
    },
  },
  plugins: [],
  // plugins: {
  //   'postcss-import': {},
  //   'tailwindcss/nesting': {},
  //   tailwindcss: {},
  //   autoprefixer: {},
  // }
}
