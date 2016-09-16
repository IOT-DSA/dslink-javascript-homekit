"use strict";
var HAP = require("hap-nodejs");
var state = require('./lib/state');
var link = state.link;
link.init();
link.connect().then(function (_) {
    HAP.init();
    state.startBridge();
    setInterval(function (_) {
        link.save();
    }, 1000 * 2.5);
});
