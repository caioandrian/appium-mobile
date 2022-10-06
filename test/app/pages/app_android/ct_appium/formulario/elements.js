module.exports = ELEMENTS = {
    FORM: {
        //https://developer.android.com/reference/android/support/test/uiautomator/UiSelector#childSelector(android.support.test.uiautomator.UiSelector)
        //uiautomator2: content_desc
        INPUT_NOME: 'new UiSelector().description("nome")',
        INPUT_CHECKBOX: 'new UiSelector().className("android.widget.CheckBox")',
        INPUT_SWITCH: 'new UiSelector().description("switch")',
        XPATH_SELECT_CONSOLE: 'new UiSelector().className("android.widget.Spinner").childSelector(new UiSelector().className("android.widget.TextView"))',
        OPCAO_SELECT_CONSOLE: 'new UiSelector().text("XBox One")',
        DATA: 'new UiSelector().text("01/01/2000")',
        BTN_OK: 'new UiSelector().text("OK").className("android.widget.Button")',
        DATA_POS: 'new UiSelector().text("5/2/2000")',
        FORM_SEEKER: 'new UiSelector().description("slid")',
        BTN_SALVAR: 'new UiSelector().text("SALVAR")'
    },
    DATA: {
        FRAME: 'new UiSelector().className("android.widget.FrameLayout")',
        DIA: 'new UiSelector().text("5")'
    },
    RESULTADO: {
        TXT_NOME: 'new UiSelector().textStartsWith("Nome:")',
        TXT_CONSOLE: 'new UiSelector().textStartsWith("Console:")',
        TXT_SWITCH: 'new UiSelector().textStartsWith("Switch:")',
        TXT_CHECKBOX: 'new UiSelector().textStartsWith("Checkbox:")',
        TXT_SEEKBAR: 'new UiSelector().textStartsWith("Slider:")',
        TXT_DATA: 'new UiSelector().textStartsWith("Data:")'
    }
}