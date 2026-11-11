/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2.5rem' },
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1240px' },
    },
    extend: {
      colors: {
        canvas: '#F2F1EE',
        // Warm neutral scale; replaces Tailwind's cool gray
        gray: {
          50: '#F7F6F4',
          100: '#EFEEEA',
          200: '#E2E0DB',
          300: '#CDCAC3',
          400: '#8E8C86',
          500: '#6A6964',
          600: '#52524D',
          700: '#3D3E3A',
          800: '#292A27',
          900: '#181917',
        },
        ink: {
          600: '#3A474C',
          700: '#2A363B',
          800: '#1C272B',
          900: '#12191C',
        },
        // Petrol: the single brand accent
        accent: {
          50: '#EAF3F2',
          100: '#D3E6E4',
          200: '#A8CECA',
          300: '#72AFAA',
          400: '#3F8F8A',
          500: '#1C7671',
          600: '#0F5F5C',
          700: '#0B4D4B',
          800: '#093E3D',
          900: '#072F2E',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['"Outfit Variable"', 'Outfit', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        // Display steps on a 1.25 ratio; body sizes stay Tailwind defaults
        'display-sm': ['1.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-lg': ['3rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-xl': ['4rem', { lineHeight: '1', letterSpacing: '-0.035em' }],
      },
      borderRadius: {
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(18, 25, 28, 0.05)',
        DEFAULT: '0 1px 2px rgba(18, 25, 28, 0.05), 0 4px 12px -4px rgba(18, 25, 28, 0.08)',
        md: '0 1px 2px rgba(18, 25, 28, 0.05), 0 8px 24px -8px rgba(18, 25, 28, 0.12)',
        lg: '0 2px 4px rgba(18, 25, 28, 0.04), 0 18px 40px -16px rgba(18, 25, 28, 0.18)',
        xl: '0 2px 4px rgba(18, 25, 28, 0.04), 0 28px 60px -24px rgba(18, 25, 28, 0.22)',
        '2xl': '0 2px 4px rgba(18, 25, 28, 0.04), 0 40px 80px -32px rgba(18, 25, 28, 0.28)',
      },
    },
  },
  plugins: [],
};
