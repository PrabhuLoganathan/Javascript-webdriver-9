"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const FILE_PATH = process.platform === 'win32' ? path_1.join(process.cwd(), 'lib', 'chromedriver.exe') : path_1.join(process.cwd(), 'lib', 'chromedriver');
fs_1.chmodSync(FILE_PATH, '755');
const command = child_process_1.spawn(FILE_PATH);
command.stdout.on('data', (data) => {
    console.log(data.toString());
});
command.stderr.on('data', (data) => {
    console.error(data.toString());
});
command.on('close', (code) => {
    console.log(`Exit code ${code}`);
});
process.on('SIGTERM', function () {
    command.kill('SIGTERM');
    process.exit(1);
});
