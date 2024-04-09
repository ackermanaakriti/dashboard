/** @type {import('tailwindcss').Config} */
module.exports = {
  content:  ["./src/**/*.{js,jsx,ts,tsx}"],
 
  theme: {
    extend: {
      colors: {
       PrimaryColor:"#034848",
       SecondaryColor:'#95BFBF',
       bgclr:'#F6FBFF',
       tblbg:'#C0D3E4',
       borderclr:'#c0d3e5',
       redclr:'#d40d10'
      },
      fontFamily: {
        'inter':[ 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

