/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0095f6',
      },
      animation: {
        'ping-once': 'ping 600ms cubic-bezier(0, 0, 0.2, 1)',
      },
    },
  },
  plugins: [require('daisyui'), require('flowbite/plugin')],
}
