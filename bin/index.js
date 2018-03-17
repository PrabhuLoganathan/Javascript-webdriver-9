"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const ChromeVersion_1 = __importDefault(require("./modules/ChromeVersion"));
const ChromeDriver_1 = __importDefault(require("./modules/ChromeDriver"));
const DriverZIP_1 = __importDefault(require("./modules/DriverZIP"));
const chrome = new ChromeVersion_1.default();
const chromeDriver = new ChromeDriver_1.default();
const driverZIP = new DriverZIP_1.default();
let chromeVersion = 0;
chrome.getChromeVersion()
    .then((value) => { chromeVersion = value; })
    .then(() => chromeDriver.getLatestVersionNumber())
    .then((version) => chromeDriver.getVersionNotes(version))
    .then((notes) => {
    chromeDriver.parseNotesResponse(notes);
    return chromeDriver.getSuitableVersionForYourChrome(chromeVersion);
})
    .then((chromeDriverVersion) => {
    driverZIP.getZIP(chromeDriverVersion);
})
    .catch((error) => {
    console.error(error);
});
chromeDriver.getLatestVersionNumber();
