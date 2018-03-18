#!/usr/bin/env node

const join = require('path').join;
const spawn = require('child_process').spawn;
const chmodSync = require('fs').chmodSync;

const FILE_PATH = process.platform === 'win32' ? join(__dirname, '..','..','lib', 'chromedriver.exe') : join(__dirname, '..','..','lib', 'chromedriver');

chmodSync(FILE_PATH, '755');

const command = spawn(FILE_PATH);

command.stdout.on('data', (data: Buffer) => {
  console.log(data.toString());
});

command.stderr.on('data', (data: Buffer) => {
  console.error(data.toString());
});

command.on('close', (code: number) => {
  console.log(`Exit code ${code}`);
});

process.on('SIGTERM', function () {
  command.kill('SIGTERM');
  process.exit(1);
});