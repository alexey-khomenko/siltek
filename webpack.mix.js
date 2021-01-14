let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug');

mix
    .setPublicPath('docs')
    // .copyDirectory('resources/images/*.*', 'docs/images')
    // .copyDirectory('resources/favicons/*.*', 'docs/favicons')
    .js('resources/scripts/app.js', 'js/scripts.js')
    .js('node_modules/alpinejs/dist/alpine.js', 'js/alpine.js')
    .sass('resources/styles/app.scss', 'css/styles.css')
    .options({
        postCss: [
            require('tailwindcss')('tailwind.config.js'),
        ]
    })
    .pug('resources/views/pages/*.pug', '../../../docs', {
        pug: {
            pretty: true
        }
    })
;

if (mix.inProduction()) {
    //
} else {
    mix.browserSync({
        server: "./docs",
        files: [
            'resources/**/*.*',
        ],
    });
}