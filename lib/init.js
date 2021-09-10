const { promisify } = require("util");
const figlet = promisify(require("figlet"));

// clear screen
const clear = require("clear");
const chalk = require("chalk");
const { clone } = require("./download");

const log = content => console.log(chalk.green(content));
const logErr = content => console.log(chalk.red(content))

const spawn = async (...args) => {
    // 日志流对接， 子对接到主进程
    // promise 风格
    const { spawn } = require("child_process");
    const options = args[args.length - 1];
    if (process.platform == 'win32') {
        // 隐式调用cmd
        options.shell = true
    } else {
        // nothing
    }

    return new Promise(resolve => {
        // 子进程
        const proc = spawn(...args);
        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);

        proc.on('close', () => {
            resolve()
        })
    })
}

const open = require("open");

module.exports = async name => {
    clear();
    const data = await figlet("hello welcome !");
    log(data);
    log('create project: ' + name);

    // clone
    await clone('github:YouYouzmr/vue3-project-management', name)
        .catch(err => {
            logErr(JSON.stringify(err))
        })

    // npm install
    log('安装依赖');
    // cwd: 指定文件
    await spawn("npm", ['install'], { cwd: `./${name}` })

    log(`
安装成功
get start: 
==============================
cd ${name}
npm run serve
==============================
`)

    open("http://localhost:8080");
    await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })
}
