'use strict';

var path = require('path');

module.exports = [

    'watch and react on changes',

    function(done) {

        var watchers = {
            app: {
                glob: [
                    '*.js',
                    'config/**/*',
                    'modules/**/*',
                    'routes/**/*'
                ],
                sequence: ['app:reload']
            },
            stylus: {
                glob: 'assets/stylus/**/*.styl',
                sequence: ['clean:css', 'build:css']
            }
        };

        Object.keys(watchers).forEach(function(watcherID) {
            var watcher = watchers[watcherID];
            this.util.log('Watching ' + this.util.colors.magenta(watcherID) + '...');
            this.gulp.watch(watcher.glob, {
                cwd: this.paths.app
            }, function(event) {
                var eventIcon = this.util.colors.yellow('☀ '),
                    eventPath = this.util.colors.magenta(
                        path.relative(this.paths.cwd, event.path)
                    ),
                    eventType = this.util.colors.yellow(event.type);
                this.util.log(eventIcon + 'File ' + eventPath + ' was ' + eventType);
                this.runSequence.apply(this.gulp, watcher.sequence);
            }.bind(this));
        }.bind(this));

    }

];
