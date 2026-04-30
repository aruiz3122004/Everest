import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff1f6",
          100: "#ffe4ef",
          500: "#ec4899",
          600: "#db2777"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(10, 10, 10, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
