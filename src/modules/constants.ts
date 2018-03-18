import { join } from 'path';

export const PLATFORM: NodeJS.Platform = process.platform;
export const DEFAULT_CHROME_VERSION: number = 65;
export const ZIP_ROUTE: string = join(process.cwd(),'lib');
export const CHROMEDRIVER_API: string = 'https://chromedriver.storage.googleapis.com/';
export const LATEST_RELEASE_PATH: string = 'LATEST_RELEASE';
export const VERSION_PATH: string = 'index.html?path={version}';
export const VERSION_NOTES_PATH: string = '{version}/notes.txt';
export const OS_ARCH: { [key: string]: string } = {
  'darwin': 'mac64',
  'win32' : 'win64',
  'linux' : 'linux64'
};
