const path = require("path");

/** @typedef { import('webpack').Configuration } WebpackConfig */
/** @type WebpackConfig */
const webConfig = {
    target: 'webworker',
    entry: {
        extension: './src/extensionWeb.ts',
    },
    output:{
        filename: '[name].js',
        path: path.join(__dirname, 'dist', 'web', 'wp'),
        libraryTarget: 'commonjs',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    },
    resolve: {
        mainFields: ['browser', 'module', 'main'],
        extensions: ['.ts', '.tsx', '.js']
    },
    externals: {
        vscode: 'commonjs vscode'
    }
}

module.exports = [
    webConfig
]