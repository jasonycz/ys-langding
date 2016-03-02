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
    .pipe(gulp.dest('dist/html'));
});
//压缩css
gulp.task('minify_css', function() {
    return gulp.src('styles/*.css')      //压缩的文件
        .pipe(minifycss())   //执行压缩
        .pipe(gulp.dest('dist/css'));   //输出文件夹
        
});
// gulp.task('css', function() {
//     return gulp.src('styles/main.css')      //压缩的文件
//         .pipe(minifycss({ 
//             advanced: true,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
//             compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
//             keepBreaks: false}))//类型：Boolean 默认：false [是否保留换行]}))   //执行压缩
//         .pipe(gulp.dest('dist/css'));   //输出文件夹
        
// });
// //压缩css
// gulp.task('minify_css', function() {
//     return gulp.src('styles/*.css')      //压缩的文件
//         .pipe(gulp.dest('dest/css'))    //执行压缩
//         .pipe(minifycss());   //输出文件夹   
        
        
// });
//压缩js
gulp.task('minify_js', function() {
    return gulp.src('scripts/*.js')
        //.pipe(concat('main.js'))    //合并所有js到main.js
        //.pipe(gulp.dest('dist/js'))    //输出main.js到文件夹
        //.pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dist/js'));  //输出
});
//执行压缩前，先删除文件夹里的内容
gulp.task('clean', function(cb) {
 	del(['dist/css', 'dist/js','dist/html'], cb);

});
//默认命令，在cmd中输入gulp后，执行的就是这个命令
gulp.task('default', ['clean','minify_css','minify_js','minify_html']
);


