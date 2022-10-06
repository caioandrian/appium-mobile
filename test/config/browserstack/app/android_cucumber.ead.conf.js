const { config: baseConfig } = require('./../wdio.cucumber.shared.conf.js');
var browserstack = require('browserstack-local');

baseConfig.cucumberOpts.require = ['./app/e2e/steps_definitions/app_android/android_ct_appium.steps.js'];

const localConfig = {
  specs: ['./app/e2e/spec/app_android/android_ct_appium.feature'],

  //Para funcionar o acesso local com APP é preciso que não esteja aberto o BrowserstackLocal na sua máquina.
  services: [
    ['@wdio/browserstack-service', {
        browserstackLocal: true
    }]
  ],
  
  capabilities: [{
    project: "Webdriverio Android Project",
    build: 'CT_Appium_v1.0',
    device: 'Google Pixel 3',
    os_version: "9.0",
    automationName:'UIAutomator2',
    app: process.env.BROWSERSTACK_APP_ID ||  'bs://848f502356e303cc4e50b9669c64351a41a0c666',
    'browserstack.debug': true,
    /*'browserstack.video' : false,
    'browserstack.appiumLogs': false,
    'browserstack.deviceLogs': false*/
  }],

  // Code to start browserstack local before start of test
  onPrepare: (localConfig, capabilities) => {
    console.log("Connecting local");
    return new Promise( (resolve, reject) => {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({'key': baseConfig.key, 'force': 'true', 'forceLocal': 'true'}, (error) => {
        if (error) return reject(error);
        console.log('Connected. Now testing...');

        resolve();
      });
    });
  },

  // Code to stop browserstack local after end of test
  onComplete: (capabilties, specs) => {
    console.log("Closing local tunnel");
    return new Promise( (resolve, reject) => {
      exports.bs_local.stop( (error) => {
        if (error) return reject(error);
        console.log("Stopped BrowserStackLocal");

        resolve();
      });
    });
  }
};

exports.config = { ...baseConfig, ...localConfig };