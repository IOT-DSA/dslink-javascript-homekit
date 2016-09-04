"use strict";
const HAP = require("hap-nodejs");
const store = require("./lib/store");
const state = store.store.state;
const link = state.link();
link.init();
link.connect().then(_ => {
    HAP.init();
    state.bridge();
    setInterval(_ => {
        link.save();
    }, 1000 * 2.5);
});
