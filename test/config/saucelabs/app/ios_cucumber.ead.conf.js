const { config: baseConfig } = require('../wdio.cucumber.shared.conf');

baseConfig.cucumberOpts.require = ['./app/e2e/steps_definitions/app_ios/ios_teste.steps.js'];

const testConfig = {
  specs: ['./app/e2e/spec/app_ios/ios_teste.feature'],

  //Não é possível acessar o APP de teste no device simulado
  capabilities: [{
    platformName: 'iOS',
    'appium:app': 'storage:filename=SauceLabs-Demo-App.ipa',
    'appium:deviceName': 'iPhone XS Simulator',
    'appium:platformVersion': '15.0',
    'sauce:options': {
      appiumVersion: '1.22.3',
      build: "Webdriverio IOS Project - APP Teste",
      name: "IOS -  APP Teste",

      //HABILITAR NAS CONFIGURACOES DA ORGANIZAÇÃO SAUCELABS: 
      //REQUIRE SAUCE CONNECT PROXY/VPN TRUE
      //C:\sc-4.8.0-win32\bin>
      //sc.exe -u oauth-eadteste2022-a7f83 -k aa45b2c0-b832-4ce3-ac00-f268d22f1c6f --region us-west --tunnel-name teste-edtech --shared-tunnel
      tunnelName: 'teste-edtech'
    }
  }]
};

exports.config = { ...baseConfig, ...testConfig };