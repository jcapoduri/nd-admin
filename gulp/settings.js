module.exports = {
    basePath: './web',
    distPath: './public',
    scripts: 'web/**/*.js',
    styles: ['./web/**/*.css', './web/**/*.scss'],
    static: ['./static/**/*', './static/**/.*'],
    images: './images/**/*',
    fonts: ['./node_modules/font-awesome/fonts/*', './node_modules/bootstrap-sass/assets/fonts/**/*'],
    index: './web/index.html',
    appBootstrap: './web/bootstrap.js'
}
