const Base = require('../base/base_page');
const el = require('./elements');

class Google_Home extends Base{
    
    async acessar_pagina(){
        await super.visit("www.google.com.br")
    }

    async pesquisar() {
        console.log("realizando pesquisa... ")
        let busca = "teste de qa"
        await super.typeElement(el.PAGINA.INPUT_PESQUISA, busca)
        await super.clickElement(el.PAGINA.TXT_OPCAO(busca))
    }

    async valida_resultados(){
        console.log("acessando página de resultados")
        await super.clickElement(el.RESULTADO.PRIMEIRO_LINK)
        console.log("validando acesso no primeiro link")
        await super.validatePageContainsTextByIndex("QA")
    }

    async valida_logo() {
        console.log("validando imagem do google")
        await super.validateElementIsVisible(el.PAGINA.IMG_GOOGLE)
    }
}

module.exports = new Google_Home();