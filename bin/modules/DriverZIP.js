"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const UNZIP = __importStar(require("unzip"));
const https_1 = require("https");
const CONSTANTS = __importStar(require("./constants"));
/**
 *
 *
 * @export
 * @class DriverZIP
 */
class DriverZIP {
    /**
     * Creates an instance of DriverZIP.
     * @memberof DriverZIP
     */
    constructor() {
        /**
         *
         *
         * @private
         * @type {string}
         * @memberof DriverZIP
         */
        this.OSArch = CONSTANTS.OS_ARCH[CONSTANTS.PLATFORM];
        /**
         *
         *
         * @private
         * @type {string}
         * @memberof DriverZIP
         */
        this.FILE_URL = `${CONSTANTS.CHROMEDRIVER_API}{version}/chromedriver_${this.OSArch}.zip`;
        /**
         *
         *
         * @private
         * @type {string}
         * @memberof DriverZIP
         */
        this.FILE_ROUTE = CONSTANTS.ZIP_ROUTE;
    }
    /**
     *
     *
     * @param {string} [URL='']
     * @returns {Promise<any>}
     * @memberof DriverZIP
     */
    getZIP(version = '') {
        const zipURL = this.FILE_URL.replace('{version}', version);
        return new Promise((resolve, reject) => {
            // tslint:disable-next-line:max-line-length
            https_1.get(zipURL, (res) => {
                res.pipe(UNZIP.Extract({ path: this.FILE_ROUTE })).on('close', () => {
                    console.log(`ChromeDriver ${version} installed correctly...`);
                    resolve(true);
                });
            }).on('error', (err) => {
                reject(err);
            });
        });
    }
}
exports.default = DriverZIP;
