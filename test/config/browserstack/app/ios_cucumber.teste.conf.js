const { config: baseConfig } = require('./../wdio.cucumber.shared.conf.js');

baseConfig.cucumberOpts.require = ['./app/e2e/steps_definitions/app_ios/ios_teste.steps.js'];

const testConfig = {
  specs: ['./app/e2e/spec/app_ios/ios_teste.feature'],
  
  //para ios será preciso outro app
  capabilities: [{
    project: "Webdriverio IOS Project",
    build: 'Teste',
    device: 'iPhone XS',
    os_version: "12",
    automationName:'xcuitest',
    app: process.env.BROWSERSTACK_APP_ID ||  'bs://444bd0308813ae0dc236f8cd461c02d3afa7901d',
    'browserstack.debug': true,
    /*'browserstack.video' : false,
    'browserstack.appiumLogs': false,
    'browserstack.deviceLogs': false*/
  }]
};

exports.config = { ...baseConfig, ...testConfig };
