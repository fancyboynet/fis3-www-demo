"use strict";
let shell = require('shelljs');
let chalk = require('chalk');
let configBuild = require('../config/build.json');
let path = require('path');

let configBuildPath = path.resolve(__dirname, '../config/build.json');
let outputPath = path.resolve(configBuildPath, configBuild.output);


if (!shell.which('fis3')) {
    console.log(chalk.red('请先安装fis3'));
    return;
}

if (shell.test('-d', outputPath)) {
    shell.rm('-rf', outputPath + '/*');
}
else{
    shell.mkdir(outputPath);
}

shell.exec('fis3 server stop -p ' + configBuild.port);
shell.exec('fis3 server start --no-browse --root ' + outputPath + ' -p ' + configBuild.port);
shell.exec('fis3 release -wLcd ' + outputPath);



