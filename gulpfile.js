'use strict';

const
    gulp        = require( 'gulp' ),
    gutil       = require( 'gulp-util' ),
    babel       = require( 'gulp-babel' ),
    sass        = require( 'gulp-sass' ),
    connect     = require( 'gulp-connect' ),
    uglify      = require( 'gulp-uglify' ),
    concat      = require( 'gulp-concat' ),
    browserify  = require( 'gulp-browserify' ),
    pump        = require( 'pump' ),
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



gulp.task( 'js', cb => {
    gulp.src( './main/**/*.js' )
        .pipe( babel() )
        .pipe( uglify() )
        .pipe( browserify() )
        .pipe( concat( 'js/bundle.js' ) )
        .on( 'error', e => gutil.log( gutil.colors.red( '[Error]' ), e.toString() ) )
        .pipe( gulp.dest( output ) )
        .pipe( connect.reload() )
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



gulp.task( 'default', [ 'html', 'js', 'sass', 'connect', 'watch' ] );
