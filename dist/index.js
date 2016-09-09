"use strict";
var HAP = require("hap-nodejs");
var store = require("./lib/store");
var state = store.store.state;
var link = state.link();
link.init();
link.connect().then(function (_) {
    HAP.init();
    state.bridge();
    setInterval(function (_) {
        link.save();
    }, 1000 * 2.5);
});
