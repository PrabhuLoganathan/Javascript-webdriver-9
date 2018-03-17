import ChromeVersion from './modules/ChromeVersion';
import ChromeDriver from './modules/ChromeDriver';
import DriverZIP from './modules/DriverZIP';

const chrome:ChromeVersion = new ChromeVersion();
const chromeDriver:ChromeDriver = new ChromeDriver();
const driverZIP: DriverZIP = new DriverZIP();

let chromeVersion: number = 0;


chrome.getChromeVersion()
  // Get Chrome version installed within the machine
  .then((value: number) => { chromeVersion = value; })
  // Get the latest ChromeDriver version
  .then(() => chromeDriver.getLatestVersionNumber())
  .then((version: string) => chromeDriver.getVersionNotes(version))
  // Obtain the relationship between ChromeDrivers and Chrome versions
  .then((notes: string) => {
    chromeDriver.parseNotesResponse(notes);
    return chromeDriver.getSuitableVersionForYourChrome(chromeVersion);
  })
  // Get ChromeDriver zip
  .then((chromeDriverVersion: string) => {
    driverZIP.getZIP(chromeDriverVersion);
  })
  .catch((error) => {
    console.error(error);
  });

chromeDriver.getLatestVersionNumber();
  
