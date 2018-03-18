import * as UNZIP from 'unzip';
import { get as GET_REQUEST } from 'https';
import * as CONSTANTS from './constants';



/**
 * 
 * 
 * @export
 * @class DriverZIP
 */
export default class DriverZIP {
  /**
   * 
   * 
   * @private
   * @type {string}
   * @memberof DriverZIP
   */
  private OSArch: string = CONSTANTS.OS_ARCH[CONSTANTS.PLATFORM];
  /**
   * 
   * 
   * @private
   * @type {string}
   * @memberof DriverZIP
   */
  private FILE_URL: string = `${CONSTANTS.CHROMEDRIVER_API}{version}/chromedriver_${this.OSArch}.zip`;
  /**
   * 
   * 
   * @private
   * @type {string}
   * @memberof DriverZIP
   */
  private FILE_ROUTE: string = CONSTANTS.ZIP_ROUTE;
  /**
   * Creates an instance of DriverZIP.
   * @memberof DriverZIP
   */
  constructor() {

  }
  /**
   * 
   * 
   * @param {string} [URL=''] 
   * @returns {Promise<any>} 
   * @memberof DriverZIP
   */
  public getZIP(version:string = ''): Promise<any> {
    const zipURL: string = this.FILE_URL.replace('{version}', version);
    
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:max-line-length
      GET_REQUEST(zipURL, (res) => {
        
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
