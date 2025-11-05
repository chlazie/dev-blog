import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      blur: {
        xs: '2px',
      }
    },
  },
  plugins: [typography],
} satisfies Config