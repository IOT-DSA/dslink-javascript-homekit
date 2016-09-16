import DS = require('dslink');
import HAP = require("hap-nodejs");

import state = require('./lib/state');

const link: DS.LinkProvider = state.link;

link.init();

link.connect().then(_ => {
  HAP.init();
  state.startBridge();
  
  setInterval(_ => {
    link.save();
  }, 1000 * 2.5);
});