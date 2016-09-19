"use strict";
var state = require('./lib/state');
var link = state.link;
link.init();
link.connect().then(function (_) {
    state.startBridge();
    setInterval(function (_) {
        link.save();
    }, 1000 * 2.5);
});
