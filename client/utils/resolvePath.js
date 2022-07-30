const path = require('path')

function resolvePath(relative, moduleKey) {
    const moduleKeys = {
        marketing: '/pages/marketing',
    }

    const cwd = process.cwd()
    return path.join(cwd, relative + moduleKeys[moduleKey] || '')
}
module.exports = resolvePath