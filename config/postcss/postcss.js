module.exports = {
    plugins: {
        autoprefixer: {},
        tailwindowcss: {
            config: path.resolve(__dirname, '../tailwindcss/tailwindcss.js')
        }
    }
}