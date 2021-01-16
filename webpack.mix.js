let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug');

mix
    .setPublicPath('docs')
    // .copyDirectory('resources/images/*.*', 'docs/images')
    // .copyDirectory('resources/favicons/*.*', 'docs/favicons')
    .js('resources/scripts/app.js', 'js/scripts.js')
    .sass('resources/styles/app.scss', 'css/styles.css')
    .sass('resources/styles/customer.scss', 'template.css')
    // .options({
    //     postCss: [
    //         require('tailwindcss')('tailwind.config.js'),
    //     ]
    // })
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