const webpack = require ('webpack');


const extensions = [
    '.web.js',
    '.mjs',
    '.js',
    '.json',
    '.web.jsx',
    '.jsx',
    '.ts',
    '.tsx',
];

const plugins = [];

const loaders = [];

const rules = [{
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
  }];


module.exports = {
    plugins,
    loaders,
    rules,
    extensions,
};