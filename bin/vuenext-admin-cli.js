#!/usr/bin/env node
// console.log("vuenext-admin-cli...")
   
// 定制命令行界面
const program = require("commander")
program.version(require('../package.json').version)

// act int vuenext-admin-cli 创建 vuenext-admin-cli 工厂
program.command('init <name>')
    .description("init project")
    .action(require('../lib/init.js'))

// argv 执行中所有参数
program.parse(process.argv)