#! /usr/bin/env node

const commander = require('commander');
const packageJson = require('./package.json');
const create = require('./commands//create');

commander.version(packageJson.version);
commander.command('create')
.description('创建文件夹')
.option('-f, --fileName, <string>', '文件夹名称')
.option('-c, --config, <string>', '配置文件名称')
.action(create);
commander.parse();
