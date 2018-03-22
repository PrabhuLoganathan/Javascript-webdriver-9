import { spawn } from 'child_process';
import * as CONSTANTS from './constants';

type OS_REGEXP = {
  [key: string]: RegExp,
};

type OS_COMMANDS = {
  [key: string]: {
    main: string,
    params: string[]
  },
};
/**
 * 
 * 
 * @export
 * @class ChromeVersion
 */
export default class ChromeVersion{
  /**
   * 
   * 
   * @private
   * @type {string}
   * @memberof ChromeVersion
   */
  private currentOS: NodeJS.Platform = CONSTANTS.PLATFORM;
  /**
   * 
   * 
   * @private
   * @type {OS_REGEXP}
   * @memberof ChromeVersion
   */
  private regexps: OS_REGEXP = {
    darwin: /(Google Chrome) (\d+)/g,
    win32: /(Google Chrome) (\d+)/g,
    linux: /(Google Chrome) (\d+)/g,
  };
  /**
   * 
   * 
   * @private
   * @type {OS_COMMANDS}
   * @memberof ChromeVersion
   */
  private commands: OS_COMMANDS = {
    darwin: {main:'/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome', params:[]},
    win32: {main: 'start', params: ['chrome']},
    linux: { main: 'google-chrome' , params: []},
  };
  /**
   * Creates an instance of ChromeVersion.
   * @memberof ChromeVersion
   */
  constructor() {
  }
  /**
   * 
   * 
   * @returns {Promise<string>} 
   * @memberof ChromeVersion
   */
  public getChromeVersion(): Promise<number> {
    const OSCommand = this.commands[this.currentOS];
    const command = spawn(OSCommand.main, [...OSCommand.params,'--version']);

    let response: string = '';
    
    return new Promise((resolve, reject) => {

      if (this.currentOS === 'win32') resolve(CONSTANTS.DEFAULT_CHROME_VERSION);

      command.stdout.on('data', (data: Buffer) => {
        const stringData: string = data.toString();
        response = this.regexps[this.currentOS].exec(stringData)[2];
      });

      command.stderr.on('data', (data:Buffer) => {
        reject(data);
      });

      command.on('close', (code: number) => {
        if (code === 0) resolve(parseInt(response));
        else reject('Child process exit with an error code');
      });

    });
  }
}
