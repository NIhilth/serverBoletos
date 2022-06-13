const express = require("express")
const router = express.Router()
const { listaBoletos } = require("../database")

function buscarBoletos() {
    return listaBoletos
}

function buscarBoleto(id) {
    return listaBoletos.find(e => {
        if (e.id == id) {
            return e
        }
    })
}

function buscarBoletosDaPessoa(id) {
    const listaBoletosPessoa = []
    listaBoletos.forEach(e => {
        if (e.id_pessoa == id) {
            listaBoletosPessoa.push(e)
        }
    })
    return listaBoletosPessoa
}

function buscarBoletosDoUsuario(id) {
    const listaBoletosUsuario = []
    listaBoletos.forEach(e => {
        if (e.id_usuario == id) {
            listaBoletosUsuario.push(e)
        }
    })
    return listaBoletosUsuario
}

function inserirBoleto(boleto) {
    const id = listaBoletos.length + 1
    boleto.id = id
    listaBoletos.push(boleto)
}

function alterarBoleto(id, boleto) {
    const index = listaBoletos.findIndex(e => e.id == id)
    boleto.id = id
    listaBoletos[index] = boleto
}

module.exports = { router, buscarBoletos, buscarBoleto, buscarBoletosDaPessoa, buscarBoletosDoUsuario, inserirBoleto, alterarBoleto}