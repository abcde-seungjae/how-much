/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

/** 정수 값 프리셋 설정 */
const num0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}`) };
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: num0_10,
      boxShadow: {
        DEFAULT: "rgba(210 210 216 / 10%) 0px 3px 6px",
        navbar: "0 3px 10px rgba(146 153 184 / 6%)",
        navHover: "0 10px 25px rgb(0 0 0 / 19%)",
      },
      colors: {
        "black-33": "rgb(33, 33, 33)",
        "black-44": "rgb(44, 44, 44)",
        "black-66": "rgb(66,66,66)",
        "hm-yellow": "rgb(255, 220, 98)",
        "hm-plum": "rgb(239, 91, 118)",
        "hm-beise": "rgb(251, 242, 225)",
        "hm-green": "rgb(82, 132, 67)",
        "hm-brown": "rgb(87, 78, 61)",
        "hm-black": "rgb(24, 24, 34)",
        "hm-gray": "rgb(106, 123, 143)",
      },
      fontFamily: {
        sans: ["Noto Sans KR"],
        mukta: ["Mukta"],
        nanum: ["Nanum Gothic"],
        hansan: ["Black Han Sans"],
        Pretendard: ["Pretendard"],
        PretendardB: ["PretendardB"],
      },
      animation: {
        "particle-1":
          "particle-1 2.5s forwards cubic-bezier(0.415, 0.547, 0, 0.809)",
        "particle-2":
          "particle-2 2.5s forwards cubic-bezier(0.415, 0.547, 0, 0.809)",
        "particle-3":
          "particle-3 2.5s forwards cubic-bezier(0.415, 0.547, 0, 0.809)",
        "particle-4":
          "particle-4 2.5s forwards cubic-bezier(0.415, 0.547, 0, 0.809)",
        "particle-5":
          "particle-5 2.5s forwards cubic-bezier(0.415, 0.547, 0, 0.809)",
        "particle-6":
          "particle-6 2.5s forwards cubic-bezier(0.415, 0.547, 0, 0.809)",
        "particle-7":
          "particle-7 2.5s forwards cubic-bezier(0.415, 0.547, 0, 0.809)",
        "particle-8":
          "particle-8 2.5s forwards cubic-bezier(0.415, 0.547, 0, 0.809)",
        "particle-9":
          "particle-9 2.5s forwards cubic-bezier(0.415, 0.547, 0, 0.809)",
        "particle-10":
          "particle-10 2.5s forwards cubic-bezier(0.415, 0.547, 0, 0.809)",
        spin: "spin 2.5s linear infinite",
        spin_mirror: "spin_mirror 2.5s linear infinite",
        fadein:
          "fadein 2.5s 0.5s forwards cubic-bezier(0.415, 0.547, 0, 0.809)",
        fadeup: "fadeup 2.5s forwards cubic-bezier(0.415, 0.547, 0, 0.809)",
      },
      keyframes: {
        spin: {
          "0%": {
            transform: "rotateZ(0)",
          },
          "50%": {
            transform: "rotateZ(180deg)",
          },
          "100%": {
            transform: "rotateZ(360deg)",
          },
        },
        spin_mirror: {
          "0%": {
            transform: "rotateZ(0)",
          },
          "50%": {
            transform: "rotateZ(-180deg)",
          },
          "100%": {
            transform: "rotateZ(-360deg)",
          },
        },
        "particle-1": {
          "0%": {
            transform: "translateX(0) translateY(0) scale(0) ",
          },
          "100%": {
            transform: "translateX(-120px) translateY(0px) scale(3)",
            opacity: 1,
          },
        },
        "particle-2": {
          "0%": {
            transform: "translateX(0) translateY(0) scale(0)",
          },
          "100%": {
            transform: "translateX(-90px) translateY(-70px) scale(2)",
            opacity: 1,
          },
        },
        "particle-3": {
          "0%": { transform: "translateX(0) translateY(0) scale(0)" },
          "100%": {
            transform: "translateX(-150px) translateY(-150px) scale(1.5)",
            opacity: 1,
          },
        },
        "particle-4": {
          "0%": {
            transform: "translateX(0) translateY(0) scale(0)",
          },
          "100%": {
            transform: "translateX(-100px) translateY(130px) scale(3)",
            opacity: 1,
          },
        },
        "particle-5": {
          "0%": {
            transform: "translateX(0) translateY(0) scale(0)",
          },
          "100%": {
            transform: "translateX(0px) translateY(100px) scale(2)",
            opacity: 1,
          },
        },
        "particle-6": {
          "0%": {
            transform: "translateX(0) translateY(0) scale(0)",
          },
          "100%": {
            transform: "translateX(90px) translateY(-120px) scale(1.5)",
            opacity: 1,
          },
        },
        "particle-7": {
          "0%": {
            transform: "translateX(0) translateY(0) scale(0)",
          },
          "100%": {
            transform: "translateX(-30px) translateY(-100px) scale(2)",
            opacity: 1,
          },
        },
        "particle-8": {
          "0%": {
            transform: "translateX(0) translateY(0) scale(0)",
          },
          "100%": {
            transform: "translateX(100px) translateY(140px) scale(3)",
            opacity: 1,
          },
        },
        "particle-9": {
          "0%": {
            transform: "translateX(0) translateY(0) scale(0)",
          },
          "100%": {
            transform: "translateX(100px) translateY(-20px) scale(2)",
            opacity: 1,
          },
        },
        "particle-10": {
          "0%": {
            transform: "translateX(0) translateY(0) scale(0)",
          },
          "100%": {
            transform: "translateX(150px) translateY(60px) scale(1)",
            opacity: 1,
          },
        },
        fadein: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        fadeup: {
          "0%": {
            opacity: 0,
            transform: "translateY(8px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme("fontSize.4xl") },
        h2: { fontSize: theme("fontSize.3xl") },
        h3: { fontSize: theme("fontSize.2xl") },
        h4: { fontSize: theme("fontSize.xl") },
        h5: { fontSize: theme("fontSize.lg") },
      });
    }),
  ],
};
