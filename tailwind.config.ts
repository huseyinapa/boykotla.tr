/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode:["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}", // Pages klasöründeki dosyalar
        "./components/**/*.{js,ts,jsx,tsx}", // Components klasöründeki dosyalar
        "./app/**/*.{js,ts,jsx,tsx}", // App klasöründeki dosyalar (Next.js 13+ için)
        "./src/**/*.{js,ts,jsx,tsx}", // Diğer src içindeki dosyalar
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
            extend: {},
        },
            plugins: [],
        },
    }