let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug-recursive');
require('laravel-mix-imagemin');

// todo pug update

mix
    .setPublicPath('docs')
    .setResourceRoot('../')
    .js('resources/scripts/app.js', 'js/scripts.js')
    .sass('resources/styles/app.scss', 'css/styles.css')
    .sass('resources/styles/customer.scss', 'template.css')
    // .options({
    //     postCss: [
    //         require('tailwindcss')('tailwind.config.js'),
    //     ],
    // })
    .pug('resources/views/pages/*.pug', 'docs', {
        excludePath: 'resources/views/pages',
        pug: {
            pretty: true,
        },
    })
;

if (mix.inProduction()) {
    mix.imagemin(
        [
            'images/**.*',
            'favicons/**.*',
        ],
        {
            context: 'resources',
        },
        {
            optipng: {
                optimizationLevel: 5,
            },
            jpegtran: null,
            plugins: [
                require('imagemin-mozjpeg')({
                    quality: 100,
                    progressive: true,
                }),
            ],
        },
    );
}
else {
    mix
        .copyDirectory('resources/images/*.*', 'docs/images')
        .copyDirectory('resources/favicons/*.*', 'docs/favicons')
        .browserSync({
            server: './docs',
            files: [
                'resources/**/*.*',
            ],
        })
    ;
}