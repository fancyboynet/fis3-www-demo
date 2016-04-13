"use strict";
let shell = require('shelljs');
let chalk = require('chalk');
let configBuild = require('../config/build.json');
let path = require('path');

configBuild.output = path.resolve(__dirname, '../config/build.json', configBuild.output);

if (!shell.which('fis3')) {
    console.log(chalk.red('请先安装fis3'));
    return;
}

shell.rm('-rf', configBuild.output + configBuild.static_root + '/*');
shell.rm('-rf', configBuild.output + configBuild.tpl_root+ '/*');
shell.exec('fis3 release prod -cd ' + configBuild.output);

// shell.cp('-rf', configBuild.output + configBuild.static_root + '/', '../../../static/' + configBuild.static_root + '/');