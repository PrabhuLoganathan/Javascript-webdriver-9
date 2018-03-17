import { get as GET_REQUEST } from 'https';
import * as CONSTANTS from './constants';

type RELATION_DRIVER_SUPPORT = {
  chromeDriverVersion: string,
  minVersionSupported: number,
  maxVersionSupported: number,
};

/**
 * 
 * 
 * @export
 * @class ChromeDriver
 */
export default class ChromeDriver {
  /**
   * 
   * 
   * @private
   * @type {string}
   * @memberof ChromeDriver
   */
  private API_URL_LATEST: string = `${CONSTANTS.CHROMEDRIVER_API}${CONSTANTS.LATEST_RELEASE_PATH}`;
  // tslint:disable-next-line:max-line-length
  /**
   * 
   * 
   * @private
   * @type {string}
   * @memberof ChromeDriver
   */
  private API_URL_VERSION_NOTES: string = `${CONSTANTS.CHROMEDRIVER_API}${CONSTANTS.VERSION_NOTES_PATH}`;
  /**
   * 
   * 
   * @private
   * @type {RELATION_DRIVER_SUPPORT[]}
   * @memberof ChromeDriver
   */
  private relationsArray: RELATION_DRIVER_SUPPORT[] = [];
  /**
   * Creates an instance of ChromeDriver.
   * @memberof ChromeDriver
   */
  constructor() {
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
  private replaceVersionInURL(URL:string= '', version:string= ''):string {
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
  private getServerResponse(URL:string= ''): Promise<any> {
    return new Promise((resolve, reject) => {
      GET_REQUEST(URL, (res) => {
        let body: string = '';

        res.setEncoding('utf8');

        res.on('data', (data: Buffer) => {
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
  public getLatestVersionNumber(): Promise<any> {
    return this.getServerResponse(this.API_URL_LATEST);
  }
  /**
   * 
   * 
   * @param {string} version 
   * @returns {Promise<string>} 
   * @memberof ChromeDriver
   */
  public getVersionNotes(version: string): Promise<string> {
    // tslint:disable-next-line:max-line-length
    const VERSION_NOTES_URL = this.replaceVersionInURL(this.API_URL_VERSION_NOTES, version).replace('\n','');
    return this.getServerResponse(VERSION_NOTES_URL);
  }
  /**
   * 
   * 
   * @param {string} notes 
   * @memberof ChromeDriver
   */
  public parseNotesResponse(notes: string): void {
    const notesRegExp: RegExp = /ChromeDriver v(\d+\.\d+)\s+.+\nSupports Chrome v(\d+)-(\d+)/g;
    const notesParsed: RELATION_DRIVER_SUPPORT[] = [];
    
    let coincidences: RegExpExecArray;
    
    while ((coincidences = notesRegExp.exec(notes)) !== null) {
      const newCoincidence: RELATION_DRIVER_SUPPORT = {
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
  public getSuitableVersionForYourChrome(chromeVersion: number = 65):string {
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
