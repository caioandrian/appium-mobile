const { config: baseConfig } = require('../wdio.cucumber.shared.conf');

baseConfig.cucumberOpts.require = ['./app_android_studio/e2e/steps_definitions/app_android/android_ct_appium.steps.js'];

const testConfig = {
  specs: ['./app_android_studio/e2e/spec/app_android/android_ct_appium.feature'],
  
  capabilities: [
    {
      platformName: "Android",
      automationName: "UiAutomator2",
      deviceName: "Pixel 4",
      clearDeviceLogsOnStart: true,
      app: 'C:\\ctappium\\CTAppium_1_0.apk',
      autoGrantPermissions: true
    }
  ]
};

exports.config = { ...baseConfig, ...testConfig };