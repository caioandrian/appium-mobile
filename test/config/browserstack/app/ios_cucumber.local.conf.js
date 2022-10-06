const { config: baseConfig } = require('../wdio.cucumber.shared.conf.js');
var browserstack = require('browserstack-local');

baseConfig.cucumberOpts.require = ['./app/e2e/steps_definitions/app_ios/teste.steps.js'];

const localConfig = {
  specs: ['./app/e2e/spec/app_ios/teste.feature'],

  services: [
    ['@wdio/browserstack-service', {
        browserstackLocal: true
    }]
  ],
  
  //para ios será preciso outro app
  capabilities: [{
    project: "Webdriverio IOS Project",
    build: 'Teste',
    device: 'iPhone 11',
    os_version: "14",
    automationName:'xcuitest',
    app: process.env.BROWSERSTACK_APP_ID ||  'bs://444bd0308813ae0dc236f8cd461c02d3afa7901d',
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