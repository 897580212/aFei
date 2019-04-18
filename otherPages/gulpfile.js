var gulp = require('gulp');


//html
gulp.task("copy-html",function () {
    return gulp.src('*.html')
    .pipe(gulp.dest('E:\\phpStudy\\PHPTutorial\\WWW\\kangjiaGW'));
});

//img
gulp.task('copy-img',function(){
    return gulp.src('img/*.{jpg,png,tmp,gif,svg}')
    .pipe(gulp.dest('E:\\phpStudy\\PHPTutorial\\WWW\\kangjiaGW\\img'));
});

//css
gulp.task('copy-css', function(){
    return gulp.src('css/*.css')
    .pipe(gulp.dest('E:\\phpStudy\\PHPTutorial\\WWW\\kangjiaGW\\css'));
});

//js
gulp.task('copy-js',function(){
    return gulp.src('js/*.js')
    .pipe(gulp.dest('E:\\phpStudy\\PHPTutorial\\WWW\\kangjiaGW\\js'));
});

//php
gulp.task('copy-php',function(){
    return gulp.src('php/*.php')
    .pipe(gulp.dest('E:\\phpStudy\\PHPTutorial\\WWW\\kangjiaGW\\php'));
});

gulp.task('default',gulp.parallel('copy-html','copy-img','copy-js','copy-php'));//并行执行
gulp.task("watchall",function(){
    //监视所有文件是否有变化，如果有变化，就执行任务：copy
    gulp.watch("*.html",gulp.series("copy-html"));
    gulp.watch('img/*.{jpg,png,tmp,gif,svg}',gulp.series("copy-img"));
    gulp.watch('js/*.js',gulp.series("copy-js"));
    gulp.watch('css/*.css',gulp.series("copy-css"));
    gulp.watch('php/*.php',gulp.series("copy-php"));
});
