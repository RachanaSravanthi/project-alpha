/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
            colors: {
                "off-white": "#E4E4E4",
                "dim-white": "#A0A0A0",
            },
        },
    },
    plugins: [],
};
