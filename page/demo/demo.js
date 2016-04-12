var $ = require('jquery');
var modOne = require('./modules/mod-one');
var modTwo = require('./modules/mod-two');

//页面模块间的交互逻辑尽量在页面中组织,以保持模块的独立性
$(function () {
    modOne.setText('hello');
    modTwo.setText('world');
});