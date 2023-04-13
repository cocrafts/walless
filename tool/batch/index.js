const fs = require('fs-extra');
const { resolve } = require('path');

fs.copySync(resolve(__dirname, 'modules'), resolve(__dirname, '../../node_modules'));
