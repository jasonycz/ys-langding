//在项目的根目录新建gulpfile.js，require需要的module
var gulp = require('gulp'),
minifyhtml = require("gulp-minify-html"),
minifycss = require('gulp-minify-css'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
del = require('del');
//用来压缩html文件
gulp.task('minify_html', function () {
    gulp.src('*.html') // 要压缩的html文件
    .pipe(minifyhtml()) //压缩
    .pipe(gulp.dest('dest/html'));
});
//压缩css
gulp.task('minify_css', function() {
    return gulp.src('styles/*.css')      //压缩的文件
        .pipe(minifycss())   //执行压缩
        .pipe(gulp.dest('dest/css'));   //输出文件夹
        
});
// //压缩css
// gulp.task('minify_css', function() {
//     return gulp.src('styles/*.css')      //压缩的文件
//         .pipe(gulp.dest('dest/css'))    //执行压缩
//         .pipe(minifycss());   //输出文件夹   
        
        
// });
//压缩js
gulp.task('minify_js', function() {
    return gulp.src('scripts/*.js')
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('dest/js'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dest/js'));  //输出
});
//执行压缩前，先删除文件夹里的内容
gulp.task('clean', function(cb) {
 	del(['dest/css', 'dest/js','dest/html'], cb);

});
//默认命令，在cmd中输入gulp后，执行的就是这个命令
gulp.task('default', ['clean','minify_css','minify_js','minify_html']
);


