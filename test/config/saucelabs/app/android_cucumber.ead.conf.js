const { config: baseConfig } = require('./../wdio.cucumber.shared.conf');

baseConfig.cucumberOpts.require = ['./app/e2e/steps_definitions/app_android/android_ct_appium.steps.js'];

const localConfig = {
  specs: ['./app/e2e/spec/app_android/android_ct_appium.feature'],

  capabilities: [{
    platformName : 'Android',
    'appium:deviceName': 'Samsung Galaxy S9 WQHD GoogleAPI Emulator',
    'appium:platformVersion': '9.0',
    'appium:deviceOrientation' : 'portrait',
    'appium:app': "storage:filename=CTAppium_1_0.apk",
    'appium:appPackage': "com.ctappium",
    'appium:appActivity': "com.ctappium.MainActivity",
    'sauce:options' : {
      appiumVersion: '1.22.1',
      build: "Webdriverio Android Project - APP CT_Appium",
      name: "Local - CT_Appium_v1.0",

      //HABILITAR NAS CONFIGURACOES DA ORGANIZAÇÃO SAUCELABS: 
      //REQUIRE SAUCE CONNECT PROXY/VPN TRUE
      //C:\sc-4.8.0-win32\bin>
      //sc.exe -u oauth-eadteste2022-a7f83 -k aa45b2c0-b832-4ce3-ac00-f268d22f1c6f --region us-west --tunnel-name teste-edtech --shared-tunnel
      tunnelName: 'teste-edtech'
    }
  }]
};

exports.config = { ...baseConfig, ...localConfig };
