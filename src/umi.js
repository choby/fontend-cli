const chalk = require('chalk');
const { exec } = require('child_process');
const ora = require('ora');
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');
const path = require('path');
const { bindEvent } = require('./utils');

module.exports.createUmi = (projectName) => {
    console.log();
    console.log(chalk.default(`🗃 正在初始化Umi项目. This might take a while...`));
    console.log();

    // 1: 创建项目目录
    // 2: 进入项目目录
    // 3: 创建umi项目
    const childProcess = exec("mkdir " + projectName + " && cd " + projectName + " && yarn create @umijs/umi-app", (error, stdout, stderr) => {

        const installSpinner = ora(``);
        installSpinner.start();
        if (error) {
            installSpinner.color = 'red';
            installSpinner.fail(chalk.red('🔗 Dependency installed, please try again.'));
            console.log(chalk.default(`❌ ${error}`));
        } else {
            // umi项目创建完成后设置package.json中的name、description、author字段
            const INJECT_FILES = ['package.json'];
            INJECT_FILES.forEach((file) => {
                const packagePath = path.join(`${process.cwd()}/${projectName}`, file);
                injectTemplate(packagePath, packagePath, {
                    name: projectName,
                    // description: 'aaa',
                    // author: 'ccc'
                }).then(() => {
                    INJECT_FILES.forEach((file) => {
                        console.log(`🚚 ${chalk.grey(`Create: ${projectName}/${file}`)}`);
                    });
                    // 安装依赖
                    const installProcess = exec("cd " + projectName + " && yarn", (error, stdout, stderr) => {
                        if (error) {
                            console.log(chalk.default(`❌ ${error}`));
                        } else {
                            installSpinner.color = 'green';
                            installSpinner.succeed('🎉 Dependency installed success.');
                            console.log(`${stderr}${stdout}`);
                            console.log(chalk.default(`🎉  Successfully created project ${chalk.yellow(projectName)}`));
                            console.log(chalk.default(`👉  Get started with the following commands:`));
                            console.log();
                            console.log(chalk.cyan(` ${chalk.gray('$')} cd ${projectName}`));
                            console.log(chalk.cyan(` ${chalk.gray('$')} yarn dev`));
                        }
                    });
                    bindEvent(installProcess);
                }).catch(err => {
                    console.log(chalk.default(`❌ ${err}`));
                });
            });
        }
    })
    bindEvent(childProcess);
}




const injectTemplate = function (source, dest, data) {
    return new Promise((resolve, reject) => {
        try {
            const store = memFs.create();
            const memFsEditor = editor.create(store);
            memFsEditor.writeJSON(dest, Object.assign({}, memFsEditor.readJSON(source), data));
            memFsEditor.commit(() => {
                resolve();
            });
        }
        catch {
            reject();
        }
    });
}