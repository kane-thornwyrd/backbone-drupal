'use strict';

var
  gulp       = require('gulp'),
  cog        = require('gulp-cog'),
  source     = require('vinyl-source-stream'),
  buffer     = require('vinyl-buffer'),
  rename     = require('gulp-rename'),
  uglify     = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  gutil      = require('gulp-util'),
  concat     = require('gulp-concat'),
  foreach    = require('gulp-foreach'),
  conf       = require('./gulpconf.json')
;


conf.js.uglify.cleanConf.preserveComments = function(node, comment){
  return /@\w+/.test(comment.value);
};


gulp.task('show-conf', function() {
  console.log(conf);
});


/*
  Nice thing, but I don't need Browserify in fact....
  I'LL USE IT !!! To organise my sources, but won't declare jQuery,
  nor underscore, nor Backbone, as dependencies, to avoid packing them !
  gulp.task('javascript', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: conf.javascript.browserify.entries,
    debug: true
  });

  return b.bundle()
    .pipe(source(conf.javascript.browserify.mindest))
    .pipe(buffer())
    .pipe(sourcemaps.init(conf.javascript.sourcemaps.conf))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write(conf.javascript.sourcemaps.dest))
    .pipe(gulp.dest(conf.javascript.dest));
});
*/

gulp.task('default', function() {
});

gulp.task('js', function() {
  // Include all files you want cog to know about in the pipeline
  gulp.src(conf.js.src)
    // Select the files cog should look for includes in.
    // This will also filter the stream to match the glob provided
    .pipe(cog(conf.js.masterName))
    // Loop over the filtered files
    .pipe(foreach(function(stream, masterFile) {
      return stream
        // Emit the files in order matching includes cog found in masterFile
        // back into the stream.
        .pipe(cog.includes())
        // Concat all the files together.
        .pipe(concat(masterFile.relative))
        .on('error', gutil.log)
      ;
    }))
    .pipe(uglify(conf.js.uglify.cleanConf))
    .on('error', gutil.log)
    .pipe(gulp.dest(conf.js.dest))
    .pipe(sourcemaps.init(conf.js.sourcemaps.conf))
    .pipe(uglify(conf.js.uglify.minConf))
    .on('error', gutil.log)
    .pipe(rename({ extname: conf.js.minExt }))
    .pipe(gulp.dest(conf.js.dest))
    .pipe(sourcemaps.write(conf.js.sourcemaps.dest))
    .pipe(gulp.dest(conf.js.dest))
  ;

});
