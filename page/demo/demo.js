var $ = require('jquery');
var STRINGS = require('app/strings/strings');
var modOne = require('./modules/mod-one');
var modTwo = require('./modules/mod-two');

//页面模块间的交互逻辑尽量在页面中组织,以保持模块的独立性
$(function () {
    modOne.setText(STRINGS.HELLO);
    modTwo.setText('world');
});