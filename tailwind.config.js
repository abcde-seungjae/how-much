/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

/** 정수 값 프리셋 설정 */
const num0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}`) };
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: num0_10,
      boxShadow: {
        DEFAULT: 'rgba(210 210 216 / 10%) 0px 3px 6px',
        navbar: '0 3px 10px rgba(146 153 184 / 6%)',
        navHover: '0 10px 25px rgb(0 0 0 / 19%)',
      },
      colors: {
        'black-33': 'rgb(33, 33, 33)',
        'black-44': 'rgb(44, 44, 44)',
        'black-66': 'rgb(66,66,66)',
        'hm-yellow': 'rgb(255, 220, 98)',
        'hm-plum': 'rgb(239, 91, 118)',
        'hm-beise': 'rgb(251, 242, 225)',
        'hm-green': 'rgb(82, 132, 67)',
        'hm-brown': 'rgb(87, 78, 61)',
        'hm-black': 'rgb(24, 24, 34)',
        'hm-gray': 'rgb(106, 123, 143)',
      },
      fontFamily: {
        sans: ['Noto Sans KR'],
        mukta: ['Mukta'],
        nanum: ['Nanum Gothic'],
        hansan: ['Black Han Sans'],
        Pretendard: ['Pretendard'],
        PretendardB: ['PretendardB'],
      },
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.4xl') },
        'h2': { fontSize: theme('fontSize.3xl') },
        'h3': { fontSize: theme('fontSize.2xl') },
        'h4': { fontSize: theme('fontSize.xl') },
        'h5': { fontSize: theme('fontSize.lg') },
      })
    })
  ],
}
