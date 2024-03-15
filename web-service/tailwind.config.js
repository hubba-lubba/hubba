/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            interTight: ['Inter Tight', 'sans-serif'],
            code: [
                'source-code-pro',
                'Menlo',
                'Monaco',
                'Consolas',
                'Courier New',
                'monospace',
            ],
        },
        screens: {
            sm: '560px',
            md: '768px',
            lg: '976px',
        },
        extend: {
            colors: {
                'hubba-100': '#e9e4fc', //text
                'hubba-400': '#c7b6ff', //trim accent
                'hubba-500': '#b59bff', //trim
                'hubba-600': '#a69bb2',
                'hubba-800': '#30313f',
                'hubba-900': '#100e22', //bg
            },
            fontSize: {
                base: '1rem',
            },
            lineHeight: {
                base: '1.5',
            },
            spacing: {
                'sidebar': '16rem',
            }
        },
    },
    plugins: [require('tailwind-scrollbar')],
};
