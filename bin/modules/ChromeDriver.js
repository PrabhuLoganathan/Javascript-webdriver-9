"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("https");
const CONSTANTS = __importStar(require("./constants"));
/**
 *
 *
 * @export
 * @class ChromeDriver
 */
class ChromeDriver {
    /**
     * Creates an instance of ChromeDriver.
     * @memberof ChromeDriver
     */
    constructor() {
        /**
         *
         *
         * @private
         * @type {string}
         * @memberof ChromeDriver
         */
        this.API_URL_LATEST = `${CONSTANTS.CHROMEDRIVER_API}${CONSTANTS.LATEST_RELEASE_PATH}`;
        // tslint:disable-next-line:max-line-length
        /**
         *
         *
         * @private
         * @type {string}
         * @memberof ChromeDriver
         */
        this.API_URL_VERSION_NOTES = `${CONSTANTS.CHROMEDRIVER_API}${CONSTANTS.VERSION_NOTES_PATH}`;
        /**
         *
         *
         * @private
         * @type {RELATION_DRIVER_SUPPORT[]}
         * @memberof ChromeDriver
         */
        this.relationsArray = [];
    }
    /**
     *
     *
     * @private
     * @param {string} [URL='']
     * @param {string} [version='']
     * @returns {string}
     * @memberof ChromeDriver
     */
    replaceVersionInURL(URL = '', version = '') {
        return URL.replace('{version}', version);
    }
    /**
     *
     *
     * @private
     * @param {string} [URL='']
     * @returns {Promise<any>}
     * @memberof ChromeDriver
     */
    getServerResponse(URL = '') {
        return new Promise((resolve, reject) => {
            https_1.get(URL, (res) => {
                let body = '';
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    body += data;
                });
                res.on('end', () => {
                    resolve(body);
                });
            }).on('error', (err) => {
                reject(err);
            });
        });
    }
    /**
     *
     *
     * @returns {Promise<string>}
     * @memberof ChromeDriver
     */
    getLatestVersionNumber() {
        return this.getServerResponse(this.API_URL_LATEST);
    }
    /**
     *
     *
     * @param {string} version
     * @returns {Promise<string>}
     * @memberof ChromeDriver
     */
    getVersionNotes(version) {
        // tslint:disable-next-line:max-line-length
        const VERSION_NOTES_URL = this.replaceVersionInURL(this.API_URL_VERSION_NOTES, version).replace('\n', '');
        return this.getServerResponse(VERSION_NOTES_URL);
    }
    /**
     *
     *
     * @param {string} notes
     * @memberof ChromeDriver
     */
    parseNotesResponse(notes) {
        const notesRegExp = /ChromeDriver v(\d+\.\d+)\s+.+\nSupports Chrome v(\d+)-(\d+)/g;
        const notesParsed = [];
        let coincidences;
        while ((coincidences = notesRegExp.exec(notes)) !== null) {
            const newCoincidence = {
                chromeDriverVersion: coincidences[1],
                minVersionSupported: parseInt(coincidences[2]),
                maxVersionSupported: parseInt(coincidences[3]),
            };
            notesParsed.push(newCoincidence);
        }
        this.relationsArray = notesParsed;
    }
    /**
     *
     *
     * @param {number} [chromeVersion='65']
     * @memberof ChromeDriver
     */
    getSuitableVersionForYourChrome(chromeVersion = 65) {
        // tslint:disable-next-line:no-increment-decrement
        for (let i = 0; i < this.relationsArray.length; i++) {
            const relation = this.relationsArray[i];
            // tslint:disable-next-line:max-line-length
            if (chromeVersion > relation.minVersionSupported && chromeVersion < relation.maxVersionSupported) {
                return relation.chromeDriverVersion;
            }
        }
        return this.relationsArray[0].chromeDriverVersion;
    }
}
exports.default = ChromeDriver;
