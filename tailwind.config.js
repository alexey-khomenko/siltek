module.exports = {
    prefix: 'tw-',
    purge: {
        content: ['resources/views/**/*.pug', 'resources/scripts/**/*.js'],
        options: {
            whitelist: ['is-active', 'hidden'],
        },
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            'md': {'max': '768px'},
        },
        extend: {},
    },
    variants: {
        container: false,
        extend: {},
    },
    plugins: []
}