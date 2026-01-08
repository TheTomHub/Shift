import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      colors: {
        ink: {
          DEFAULT: '#111827',
          muted: '#6B7280',
        },
        surface: {
          DEFAULT: '#F9FAFB',
          raised: '#FFFFFF',
        },
        line: {
          DEFAULT: '#E5E7EB',
          strong: '#D1D5DB',
        },
        accent: {
          DEFAULT: '#1F2937',
          soft: '#374151',
        },
        status: {
          success: '#16A34A',
          warning: '#F97316',
          danger: '#DC2626',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(17, 24, 39, 0.08)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
