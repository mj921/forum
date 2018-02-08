// gulpfile.js
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var cleanCss = require('gulp-clean-css');

gulp.task('script',function(){
    return gulp.src(['src/javascripts/*.js','src/javascripts/*/*.js','src/javascripts/*/*/*.js'])
        .pipe(changed('public/javascripts'))    //检测是否修改过
        .pipe(uglify())     //压缩
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('style',function(){
    return gulp.src(['src/stylesheets/*.css','src/stylesheets/*/*.css','src/stylesheets/*/*/*.css'])
        .pipe(changed('public/stylesheets'))    //检测是否修改过
        .pipe(cleanCss())     //压缩
        .pipe(gulp.dest('public/stylesheets'));
});
gulp.task('minify',['script','style'])

var scriptWatcher = gulp.watch(['src/javascripts/*.js','src/javascripts/*/*.js','src/javascripts/*/*/*.js'],['script']);
scriptWatcher.on('change',function(){
    console.log("任务 script 已重新执行");
})
var scriptWatcher = gulp.watch(['src/stylesheets/*.css','src/stylesheets/*/*.css','src/stylesheets/*/*/*.css'],['style']);
scriptWatcher.on('change',function(){
    console.log("任务 style 已重新执行");
})