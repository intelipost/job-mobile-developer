var gulp = require('gulp');
var replace = require('gulp-replace');
var minimist = require('minimist');

var knownOptions = {
  string: 'url',
  default: { url: 'https://webhook.site/6023011b-3a36-4ffe-88bc-d80e1bfe861a' }
};

var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('default', function() {
    
});

gulp.task('setUrl', function(){
    gulp.src('src/providers/sincronizacao-service/sincronizacao-service.ts')
      .pipe(replace(/const endereco: string = [^;]*/g, 'const endereco: string = ' + "'" + options.url + "'"))
      .pipe(gulp.dest('src/providers/sincronizacao-service'));
});



