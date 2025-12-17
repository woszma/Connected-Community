/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",           // 掃描根目錄的檔案 (App.tsx, index.tsx 等)
    "./components/**/*.{js,ts,jsx,tsx}", // 掃描 components 資料夾
    "./lib/**/*.{js,ts,jsx,tsx}",    // 掃描 lib 資料夾
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}