/** @type {import('tailwindcss').Config} */
module.exports = {
  content:  ["./src/**/*.{js,jsx,ts,tsx}"],
 
  theme: {
    extend: {
      colors: {
       PrimaryColor:"#034848",
       SecondaryColor:'#95BFBF',
       bgclr:'#F6FBFF',
       tblbg:'#C0D3E4'
      },
      fontFamily: {
        'inter':[ 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

