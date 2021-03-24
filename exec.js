const { exec, spawn } = require('child_process')
const chalk = require('chalk');
const ora = require('ora');

module.exports.exec = (command, projectName) => {
    //console.log(exec.spawn)
    const process = exec(command, (error, stdout, stderr) => {
        const installSpinner = ora(`🗃 Installing dependency. This might take a while...`);
        installSpinner.start();
        if (error) {
            installSpinner.color = 'red';
            installSpinner.fail(chalk.red('🔗 Dependency installed, please try again.'));
            console.log(error);
        } else {
            installSpinner.color = 'green';
            installSpinner.succeed('🎉 Dependency installed success.');
            console.log(`${stderr}${stdout}`);
            console.log(chalk.default(`🎉  Successfully created project ${chalk.yellow(projectName)}`));
            console.log(chalk.default(`👉  Get started with the following commands:`));
            console.log();
            console.log(chalk.cyan(` ${chalk.gray('$')} cd ${projectName}`));
            console.log(chalk.cyan(` ${chalk.gray('$')} npm start`));
        }
    })

    process.stdout.on('data', (data) => {
        console.log('stdout: ' + data.toString())
    })

    process.stderr.on('data', (data) => {
        console.log('stderr: ' + data.toString())
    })

    process.on('exit', (code) => {
        console.log('child process exited with code ' + code.toString())
    })
}
