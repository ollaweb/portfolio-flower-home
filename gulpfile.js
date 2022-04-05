"use strict"

//Папка исходнико в папка назначения
const srcPath = 'src';
const buildPath = 'dist';
// const buildPath = '/MAMP/htdocs/flower-house';
const path = {
    src: {
        html: [srcPath + '/*.html', "!" + srcPath + '/_*.html'],
        css: srcPath + '/sass/*.scss',
        js: srcPath + '/js/**/*.js',
        img: [srcPath + '/img/**/*.{jpg,png,svg,gif,ico,webp}', "!" + srcPath + '/img/**/_*.{jpg,png,svg,gif,ico,webp}'],
        fonts: srcPath + '/fonts/**/*.{woff,woff2,ttf,eot,svg,otf}',
        php: srcPath + '/*.php',
    },
    watch: {
        html: srcPath + '/**/*.html',
        css: srcPath + '/sass/**/*.scss',
        js: srcPath + '/js/**/*.js',
        img: srcPath + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
        fonts: srcPath + '/fonts/**/*.{woff,woff2,ttf}',
        php: srcPath + '/*.php',
    },
    build: {
        html: buildPath + '/',
        css: buildPath + '/css',
        js: buildPath + '/js',
        img: buildPath + '/img',
        fonts: buildPath + '/fonts',
        php: buildPath + '/',
    },
    clean: './' + buildPath,
}

//Подключаем плагины
const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();//обновляет html в браузере
const plumber = require('gulp-plumber'); //ловит ошибки
// const fileInclude = require('gulp-file-include');//объединяет куски html в один файл
const sass = require('gulp-sass')(require('sass')); //из scss в css
const autoprefixer = require('gulp-autoprefixer'); //добавляет автопрефиксы
const groupMedia = require('gulp-group-css-media-queries'); //группирует медиа запросы вместе в конец файла стилей
const cleanCSS = require('gulp-clean-css');//очистка от комментариев и сохрание в .min файл
const rename = require('gulp-rename');//сохранить файл под другим именем

const imagemin = require('gulp-imagemin'); //сжимать картинки для оптимизации

// const babel = require('gulp-babel'); //использует новый формат js в старых браузерах
// const uglify = require('gulp-uglify-es').default; //js parser
const del = require('del'); //удаляет файлы
const webpack = require('webpack-stream');

//Инициализируем BrowserSync
function sync() {
    browserSync.init({
        server: {
            baseDir: './' + buildPath + '/'
            // serveStaticOptions: { //для многостраничного сайта
            //     extensions: ["html"]
            // }
        }
    });
}

//Копируем html в папку назначения
function html() {
    return src(path.src.html)
        .pipe(plumber())
        // .pipe(fileInclude())
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream())
}

//Обрабатываем SASS файлы
function css() {
    return src(path.src.css)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(groupMedia())
        .pipe(dest(path.build.css))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream())
}

//Обрабатываем JS файлы
function js() {
    return src(path.src.js)
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'bundle.js'
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream())
}

//Сборка JS при продакшене
function js_production() {
    return src(path.src.js)
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'bundle.js'
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(dest(path.build.js))
}

//Минимизируем картинки проекта и переносим их в папку dist 
function images() {
    return src(path.src.img)
        .pipe(imagemin())
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream())
}

//Копируем шрифты и переносим их в папку dist/accets 
function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.stream())
}

//Перенос файлов php в папку dist
function php() {
    return src(path.src.php)
        .pipe(dest(path.build.php))
        .pipe(browserSync.stream())
}

//Перед новым заданием удалить прошлую папку, чтобы на выходе
//были только обновленные и актуальные файлы
function clean() {
    return del(path.clean)
}

//Следить за изменениями файлов (html, scss,js,img, fonts)
function watchFiles() {
    watch([path.watch.html], html);
    watch([path.watch.css], css);
    watch([path.watch.js], js);
    watch([path.watch.img], images);
    watch([path.watch.fonts], fonts);
    watch([path.watch.php], php);
}

let build = series(clean, parallel(html, css, js_production, images, fonts, php));
let taskManager = parallel(build, watchFiles, sync);


exports.html = html;
exports.css = css;
exports.js = js;
exports.js_production = js_production;
exports.images = images;
exports.fonts = fonts;
exports.php = php;
exports.clean = clean;
exports.build = build;
exports.sync = sync;
exports.taskManager = taskManager;

exports.default = taskManager;