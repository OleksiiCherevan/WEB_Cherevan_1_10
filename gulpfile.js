var syntax       = 'scss',
gulp         = require('gulp'),
sass         = require('gulp-sass')(require('sass'));
cleancss     = require('gulp-clean-css'),
autoprefixer = require('gulp-autoprefixer'),
concat       = require('gulp-concat'),
uglify       = require('gulp-uglify'),
rename       = require('gulp-rename'),
sourcemaps   = require('gulp-sourcemaps'),
notify       = require('gulp-notify'),
watch        = require('gulp-watch')

const OUTPUT_FOLDER = "./dist/";

// Compile .scss to *.min.css
gulp.task('styles', function() {
    return gulp.src("./app/scss/*.scss") // берем все файлы scss
    .pipe(sourcemaps.init()) // инициализируем создание Source Maps
    .pipe(concat("all.css")) 
    .pipe(sass({ outputStyle: 'compressed' }).on("error", notify.onError())) // компилируем сжатый файл .css
    .pipe(rename({ suffix: '.min', prefix : '' })) // переименовываем файл в .min.css
    .pipe(autoprefixer(['last 15 versions'])) // добавляем вендорные префиксы
    .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // удаляем все комментарии из кода
    .pipe(sourcemaps.write("./")) // пути для записи SourceMaps - в данном случае карта SourceMaps будет добавлена прям в данный файл main.min.css в самом конце
    .pipe(gulp.dest("./app/dist/css")) // перемещение скомпилированного файла main.min.css в папку app/css
  });

// Concatenate all .js from /libs/ to libs.min.js
gulp.task('scripts', function() {
    return gulp.src(
      //'app/libs/jquery/dist/jquery.min.js', // указываем пути всех подключаемых библиотек и файлов JS
      './app/js/*.js', // основной файл функций подключаем в самом конце
    )
    .pipe(sourcemaps.init()) // инициализируем создание Source Maps
    .pipe(concat('all.min.js')) // объединяем все вышеперечисленные файлы в один scripts.min.js
    .pipe(uglify()) // минифицируем и удаляем комментарии из файла scripts.min.js
    .pipe(sourcemaps.write()) // пути для записи SourceMaps - в данном случае карта SourceMaps будет добавлена прям в данный файл scripts.min.js в самом конце в формате комментария
    .pipe(gulp.dest('./app/dist/js')) // перемещаем полученный файл scripts.min.js в директорию app/js
  });

gulp.task("images", () => {
    return gulp.src("./")
})

gulp.task("watch", () => {
    gulp.watch("./app/index.html", gulp.series(['styles','scripts']));
    gulp.watch(["./app/scss/*", "./app/scss/**/*"], gulp.series(['styles']));
    gulp.watch("./app/js/*", gulp.series(['scripts']));
})

gulp.task('default', gulp.parallel('styles', 'scripts', "watch"))





