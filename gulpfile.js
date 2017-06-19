'use strict';

const
    gulp        = require( 'gulp' ),
    gutil       = require( 'gulp-util' ),
    sass        = require( 'gulp-sass' ),
    connect     = require( 'gulp-connect' ),
    concat      = require( 'gulp-concat' ),
    browserify  = require( 'gulp-browserify' ),
    uglifyjs    = require( 'uglify-js' ),
    composer    = require( 'gulp-uglify/composer' ),
    pump        = require( 'pump' ),
    minify      = composer( uglifyjs, console ),
    jsSources   = [ './main/**/*.js' ],
    sassSources = [ './main/**/*.scss' ],
    htmlSources = [ './**/*.html' ],
    output      = 'dist';


gulp.task( 'log', () => {
    gutil.log( '== Log Task ==' );
} );



gulp.task( 'copy', () => {
    gulp.src( 'index.html' )
        .pipe( gulp.dest( output ) );
} );



gulp.task( 'sass', () => {
    gulp.src( sassSources )
        .pipe( sass( { style: 'expanded' } ) )
        .on( 'error', gutil.log )
        .pipe( gulp.dest( output ) )
        .pipe( connect.reload() )
} );



gulp.task( 'js', () => {
    gulp.src( './main/js/index.js' )
        .pipe( browserify( {
            insertGlobals: true
        } ) )
        .pipe( concat( 'bundle.js' ) )
        .pipe( gulp.dest( 'dist/js/' ) );
} );



gulp.task( 'watch', () => {
    gulp.watch( jsSources, [ 'js' ] );
    gulp.watch( sassSources, [ 'sass' ] );
    gulp.watch( htmlSources, [ 'html' ] );
} );



gulp.task( 'connect', () => {
    connect.server( {
        root: '.',
        livereload: true
    } );
} );



gulp.task( 'html', () => {
    gulp.src( htmlSources )
        .pipe( connect.reload() );
} );



gulp.task( 'default', [ 'html', 'js', 'sass', 'connect' ] );
