import { join } from 'path';
import { spawn } from 'child_process';
import { chmodSync } from 'fs';

const FILE_PATH = process.platform === 'win32' ? join(process.cwd(), 'lib', 'chromedriver.exe') : join(process.cwd(), 'lib', 'chromedriver');

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