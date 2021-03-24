const Project = require('./project.js');

module.exports = (projectName = '') => {

    const project = new Project({
        projectName
    });

    project.create();
};