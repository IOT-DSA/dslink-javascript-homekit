import DS = require('dslink');
import HAP = require("hap-nodejs");

import store = require("./lib/store");

const state = store.store.state;

const link: DS.LinkProvider = state.link();

link.init();

link.connect().then(_ => {
  HAP.init();
  state.bridge();
  
  setInterval(_ => {
    link.save();
  }, 1000 * 2.5);
});