import DS = require('dslink');
import HAP = require("hap-nodejs");

import store = require("./lib/store");

const state = store.store.state;

const link: DS.LinkProvider = state.link();

link.connect().then(() => {
  HAP.init();
  state.bridge();
});