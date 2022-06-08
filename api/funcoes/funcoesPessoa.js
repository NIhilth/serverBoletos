const express = require("express")
const router = express.Router()
const { listaPessoas } = require("../database")

function buscarPessoas() {
    return listaPessoas
}

function buscarPessoa(id) {
    return listaPessoas.find(e => {
        if (e.id == id) {
            return e
        }
    })
}

function inserirPessoa(pessoa) {
    const id = listaPessoas.length + 1
    pessoa.id = id
    listaPessoas.push(pessoa)
}

function alterarPessoa(id, pessoa) {
    const index = listaPessoas.findIndex(e => e.id == id)
    pessoa.id = id
    listaPessoas[index] = pessoa
}

function deletarPessoa(id) {
    const index = listaPessoas.findIndex(e => e.id == id)
    listaPessoas.splice(index, 1)
}

module.exports = { router, buscarPessoas, buscarPessoa, inserirPessoa, alterarPessoa, deletarPessoa }