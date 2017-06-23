const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

function resolvePath(relativePath) {
      return path.resolve(appDirectory, relativePath);
}

module.exports = {
    context: resolvePath('src/'),
    appIndexJs: resolvePath('src/index.js'),
    appStyle: resolvePath('src/styles/main.styl'),
    appHtml: resolvePath('template/index.html'),
    vendor: ['react', 'react-dom'],
    appBuild: resolvePath('build'),
    serverRendererJs: resolvePath('src/serverRenderer.js'),
    server: resolvePath('server')
}
