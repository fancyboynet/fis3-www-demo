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

if (shell.test('-d', configBuild.output)) {
    shell.rm('-rf', configBuild.output + '/*');
}
else{
    shell.mkdir(configBuild.output);
}

shell.exec('fis3 server stop -p ' + configBuild.port);
shell.exec('fis3 server start --root ' + configBuild.output + ' -p ' + configBuild.port);
shell.exec('fis3 release -wLcd ' + configBuild.output);



