'use strict';

var path = require('path');

var browserify = require('browserify'),
    eventStream = require('event-stream'),
    glob = require('glob'),
    vinylBuffer = require('vinyl-buffer'),
    vinylSource = require('vinyl-source-stream'),
    watchify = require('watchify');

function Bundler(plug, file, src, dest, watch) {

    var srcFile = path.join(src, file),
        watchMsg = 'Watching bundle ' + plug.util.colors.magenta(file) + '...';

    this.bundle = watchify(browserify({
        entries: [srcFile],
        insertGlobals: false,
        paths: [
            src,
            path.join(plug.paths.cwd, 'node_modules'),
            path.join(plug.paths.cwd, 'bower_components')
        ],
        debug: true,
        transform: [],
        cache: {},
        packageCache: {}
    }), {
        delay: 100,
        ignoreWatch: ['**/node_modules/**'],
        poll: true
    });

    this.bundle.on('update', function(id) {
        var eventFile = path.relative(src, id[0]);
        plug.util.log(
            plug.util.colors.yellow('☀ ') +
            'File ' + plug.util.colors.magenta(eventFile) + ' updated. ' +
            'Bundling ' + plug.util.colors.magenta(file) +
            '...'
        );
        this.output();
    }.bind(this));

    this.bundle.on('log', function(msg) {
        plug.util.log(
            'Bundled ' + plug.util.colors.magenta(file) +
            ' ' + plug.util.colors.gray(msg)
        );
    });


    this.output = function() {
        return this.bundle
            .transform({
                global: true
            }, 'uglifyify')
            .bundle()
            .on('error', function(err) {
                plug.util.log(err.toString());
                this.emit('end');
            })
            .pipe(vinylSource(file))
            .pipe(vinylBuffer())
            .pipe(plug.plugins.plumber())
            .pipe(plug.plugins.extReplace(plug.pkg.version + '.js', '.js'))
            .pipe(plug.plugins.sourcemaps.init({
                loadMaps: true
            }))
            .pipe(plug.plugins.sourcemaps.write('.', {
                includeContent: true,
                sourceRoot: '.'
            }))
            .pipe(plug.gulp.dest(dest))
            .on('end', function() {
                if (!watch) {
                    this.bundle.close();
                } else if (watchMsg) {
                    plug.util.log(watchMsg);
                    watchMsg = false;
                }
            }.bind(this));
    };

}

module.exports = [

    'browserify javascripts',

    function(done) {

        var plug = this,
            watch = plug.watchify === true,
            src = path.join(plug.paths.assets, 'js'),
            dest = path.join(plug.paths.staticAssets, 'js');

        glob('*.js', {cwd: src}, function(err, files) {
            if (err) return plug.util.log(err);
            eventStream.merge(files.map(function(file) {
                var bundler = new Bundler(plug, file, src, dest, watch);
                return bundler.output();
            })).on('end', function() {
                if (!watch) return done();
            });
        });

    }

];
