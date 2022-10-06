const { config: baseConfig } = require('../wdio.cucumber.shared.conf');
var browserstack = require('browserstack-local');

baseConfig.cucumberOpts.require = ['./web/e2e/steps_definitions/google.steps.js'];

const localConfig = {
  specs: ['./web/e2e/spec/google.feature'],
  //baseUrl: 'https://google.com/',
  
  services: [
    ['@wdio/browserstack-service', {
        browserstackLocal: true
    }]
  ],

  capabilities: [
    {
      'bstack:options': {
          projectName: "Android",
          buildName: 'Navegador Chrome',
          sessionName: 'Google',
          userName : baseConfig.user,
          accessKey : baseConfig.key,
          realMobile: true,
          deviceName : "Samsung Galaxy S20",
          osVersion : "10.0",
          debug: true,
          "appiumVersion" : "1.22.0", 
          //"networkLogs" : "true",
      },
      browserName: 'chrome'
    }
  ],

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