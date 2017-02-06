// Import packages
var gulp = require('gulp');
var del = require('del')
var path = require('path');
var watch = require('gulp-watch');
var gulpForever = require('gulp-forever');

// Specify directories
var source = './src';
var destination = './dst';

// Watch folder task
gulp.task('watch-folder', function() {  

  // Initiate watcher
  var watcher = watch(source, 
    {
      base: source,
      events: ["add", "change", "addDir", "unlink"]
    }
  );

  // Sepecfy for delete behavour
  watcher.on('unlink', (event, eventPath) => {
   
      // Simulate the {base: 'src'} used with gulp.src in the scripts task
      var filePathFromSrc = path.relative(path.resolve(source), event);

      // Concatenate the 'build' absolute path used by gulp.dest in the scripts task
      var destFilePath = path.resolve(destination, filePathFromSrc);

      // Sync directory
      del.sync(destFilePath);
  });

  watcher.on('unlinkDir', (event, eventPath) => {

      // Do nothing
  });

  gulp.src(source + '/** /*', {base: source})
    .pipe(watcher)
    .pipe(gulp.dest(destination));
});

// Start default task
gulp.task('default', [ 'watch-folder' ]);
