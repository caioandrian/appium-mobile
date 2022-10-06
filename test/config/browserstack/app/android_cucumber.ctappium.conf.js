const { config: baseConfig } = require('./../wdio.cucumber.shared.conf.js');

baseConfig.cucumberOpts.require = ['./app/e2e/steps_definitions/app_android/android_ct_appium.steps.js'];

const testConfig = {
  specs: ['./app/e2e/spec/app_android/android_ct_appium.feature'],
  
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
  }]
};

exports.config = { ...baseConfig, ...testConfig };
