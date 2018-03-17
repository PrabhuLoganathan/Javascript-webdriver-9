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
            win32: / /g,
            linux: / /g,
        };
        /**
         *
         *
         * @private
         * @type {OS_COMMANDS}
         * @memberof ChromeVersion
         */
        this.commands = {
            darwin: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
            win32: '',
            linux: 'google-chrome',
        };
    }
    /**
     *
     *
     * @returns {Promise<string>}
     * @memberof ChromeVersion
     */
    getChromeVersion() {
        const command = child_process_1.spawn(this.commands[this.currentOS], ['--version']);
        let response = '';
        return new Promise((resolve, reject) => {
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
