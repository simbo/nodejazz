'use strict';

module.exports = [

    'delete all generated',

    function(done) {
        this.runSequence(
            ['clean:js', 'clean:css'],
            done
        );
    }

];
