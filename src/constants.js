const INJECT_FILES = ['package.json'];
const FRAMEWORKS = [
    {
        name: 'Umi',
        value: 'Umi'
    },
    {
        name: 'Electron',
        value: 'Electron'
    },
    {
        name: 'lerna',
        value: 'lerna'
    }
]
const ELECTRON_TEMPLATES = [
    {
        name: 'Electron-template',
        value: 'direct:https://github.com/mofang-cli/vue-admin-template.git'
    }
]

const REACT_TEMPLATES = [
    {
        name: 'react-admin-template',
        value: 'direct:https://github.com/mofang-cli/react-admin-template.git'
    },
    {
        name: 'react-nextjs-template',
        value: 'direct:https://github.com/mofang-cli/react-nextjs-template.git'
    },
    {
        name: 'react-electron-template',
        value: 'direct:https://github.com/mofang-cli/react-electron-template.git'
    }
]

const REACT_NATIVE_TEMPLATES = [
    {
        name: 'react-native-template',
        value: 'direct:https://github.com/mofang-cli/react-native-template.git'
    }
]

module.exports = {
    INJECT_FILES,
    FRAMEWORKS,
    ELECTRON_TEMPLATES,
    REACT_TEMPLATES,
    REACT_NATIVE_TEMPLATES
};