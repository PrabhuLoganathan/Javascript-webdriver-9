"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const CONSTANTS = __importStar(require("./constants"));
/**
 *
 *
 * @export
 * @class ChromeVersion
 */
class ChromeVersion {
    /**
     * Creates an instance of ChromeVersion.
     * @memberof ChromeVersion
     */
    constructor() {
        /**
         *
         *
         * @private
         * @type {string}
         * @memberof ChromeVersion
         */
        this.currentOS = CONSTANTS.PLATFORM;
        /**
         *
         *
         * @private
         * @type {OS_REGEXP}
         * @memberof ChromeVersion
         */
        this.regexps = {
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
        this.commands = {
            darwin: { main: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome', params: [] },
            win32: { main: 'start', params: ['chrome'] },
            linux: { main: 'google-chrome', params: [] },
        };
    }
    /**
     *
     *
     * @returns {Promise<string>}
     * @memberof ChromeVersion
     */
    getChromeVersion() {
        const OSCommand = this.commands[this.currentOS];
        const command = child_process_1.spawn(OSCommand.main, [...OSCommand.params, '--version']);
        let response = '';
        return new Promise((resolve, reject) => {
            if (this.currentOS === 'win32')
                resolve(CONSTANTS.DEFAULT_CHROME_VERSION);
            command.stdout.on('data', (data) => {
                const stringData = data.toString();
                response = this.regexps[this.currentOS].exec(stringData)[2];
            });
            command.stderr.on('data', (data) => {
                reject(data);
            });
            command.on('close', (code) => {
                if (code === 0)
                    resolve(parseInt(response));
                else
                    reject('Child process exit with an error code');
            });
        });
    }
}
exports.default = ChromeVersion;
