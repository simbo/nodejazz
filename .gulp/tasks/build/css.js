'use strict';

var path = require('path');

var autoprefixer = require('autoprefixer'),
    csswring = require('csswring'),
    lost = require('lost'),
    mqpacker = require('css-mqpacker'),
    rucksack = require('rucksack-css');

module.exports = [

  'parse stylus to css and pipe through postcss',

  function() {

    var src = path.join(this.paths.assets, 'stylus'),
        dest = path.join(this.paths.staticAssets, 'css');

    return this.gulp
      .src(path.join(src, '*.styl'))
      .pipe(this.plugins.plumber())
      .pipe(this.plugins.extReplace(this.pkg.version + '.styl', '.styl'))
      .pipe(this.plugins.sourcemaps.init())
      .pipe(this.plugins.stylus({
        paths: [
          path.join(src, 'imports'),
          path.join(this.paths.cwd, 'node_modules'),
          path.join(this.paths.cwd, 'bower_components')
        ],
        'include css': true,
        url: {
          name: 'inline-url',
          limit: false
        }
      }))
      .pipe(this.plugins.postcss([
        lost(),
        rucksack,
        autoprefixer({
          browsers: [
            'last 2 versions',
            '> 0.5%'
          ]
        }),
        mqpacker,
        csswring({
          preserveHacks: true
        })
      ]))
      .pipe(this.plugins.sourcemaps.write('.', {
        includeContent: true,
        sourceRoot: '.'
      }))
      .pipe(this.gulp.dest(dest));

  }

];
