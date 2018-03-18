"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.PLATFORM = process.platform;
exports.DEFAULT_CHROME_VERSION = 65;
exports.ZIP_ROUTE = path_1.join(process.cwd(), 'lib');
exports.CHROMEDRIVER_API = 'https://chromedriver.storage.googleapis.com/';
exports.LATEST_RELEASE_PATH = 'LATEST_RELEASE';
exports.VERSION_PATH = 'index.html?path={version}';
exports.VERSION_NOTES_PATH = '{version}/notes.txt';
exports.OS_ARCH = {
    'darwin': 'mac64',
    'win32': 'win64',
    'linux': 'linux64'
};
