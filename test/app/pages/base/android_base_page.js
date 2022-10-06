var assert = require('assert');
var chai = require('chai');

//https://webdriver.io/docs/api/element/addValue
//https://webdriver.io/docs/api/expect-webdriverio
//https://www.chaijs.com/api/assert/
//https://nodejs.org/api/assert.html

module.exports = class Base {

    async getElement(elementID){
        return await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(' + elementID + ")");
    }

    async typeElement(elementID, text){
        let element = await this.getElement(elementID)
        await element.addValue(text);
        assert.equal(await element.getText(), text);
    }

    async clickElement(elementID){
        let myButton = await this.getElement(elementID)
        await myButton.click()
    }

    async slideElementByHorizontal(elementID, def_value){
        await this.validateElementIsVisible(elementID)

        let element = await this.getElement(elementID)
        let value = def_value
        let delta = 50
        let xStart = element.getLocation('x') + delta;
        let click_x = xStart + (element.getSize('width') -2 * delta) * value
        let click_y = element.getLocation('y') + (element.getSize('height') / 2)
        element.touchAction(['press', {action: 'moveTo', x: click_x, y: click_y}, 'release'])
    }

    async waitElementUntilEnabled(elementID){
        let element = await this.getElement(elementID)
        await element.waitForEnabled();
    }

    async waitUntilElementClickable(elementID){
        let element = await this.getElement(elementID)
        await element.waitForClickable();
    }

    async scrollIntoViewElement(elementID){
        let element = await this.getElement(elementID)
        await element.scrollIntoView();
    }

    async validateElementIsChecked(elementID, value_expected = true){
        let myButton = await this.getElement(elementID)
        assert.ok(await myButton.getAttribute('checked'), value_expected)
    }

    async validateElementIsVisible(elementID) {
        let element = await this.getElement(elementID)
        await element.waitForDisplayed();
        await element.isDisplayed(); 
    }
    
    async validateElementContainsText(elementID, expected) {
        let element = await this.getElement(elementID)
        chai.assert.include(await element.getText(), expected)
    }

    async validateElementHaveText(elementID, text) {
        let element = await this.getElement(elementID)
        await expect(element).toHaveText(text);
    }
}
  