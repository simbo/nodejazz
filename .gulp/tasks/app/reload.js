'use strict';

var pm2;

module.exports = [

    'reload app process',

    function(done) {
        pm2 = pm2 || require('pm2');
        pm2.connect(function() {
            pm2.restart(this.pkg.name, function(err) {
                if (err) this.util.log(err.msg);
                else this.util.log(this.pkg.name + ' restarted.');
                pm2.disconnect();
                done();
            }.bind(this));
        }.bind(this));
    }

];
