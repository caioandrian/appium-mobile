const { config: baseConfig } = require('../wdio.cucumber.shared.conf');

baseConfig.cucumberOpts.require = ['./web/e2e/steps_definitions/google.steps.js'];

const testConfig = {
  runner: 'local',
  port: 4723,
  path: '/wd/hub/',
  
  specs: ['./web/e2e/spec/google.feature'],
  //baseUrl: 'https://google.com.br',
  
  capabilities: [
    {
      browserName: 'chrome',
      platformName: "Android",
      platformVersion: "11",
      automationName: "UiAutomator2",
      deviceName: "Nexus 5X",
      chromedriverExecutable: "C:\\chrome_driver\\chromedriver83_83.exe",
      //chromedriverExecutable: "./chromedriver83_83.exe",
      clearDeviceLogsOnStart: true
    }
  ],
};

exports.config = { ...baseConfig, ...testConfig };