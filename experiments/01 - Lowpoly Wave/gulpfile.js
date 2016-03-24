const gulp        = require("gulp");
const gutil 	    = require("gulp-util");
const gulpif 	    = require("gulp-if");
const runSequence = require("run-sequence")

gulp.task('webpack', ()=> {

  const webpack = require('webpack');

  gulp.src('')
    .pipe( webpack( require('./webpack.config.js')))
    .pipe( gulp.dest('dist/'));

})

// Execution
//-----------------------------------------
gulp.task('default', (cb)=> {

  runSequence('webpack')

})
