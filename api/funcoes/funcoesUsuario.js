const express = require("express")
const router = express.Router()
const { listaUsuarios } = require("../database")

function buscarUsuarios() {
    return listaUsuarios
}

function buscarUsuario(id) {
    return listaUsuarios.find(e => {
        if (e.id == id) {
            return e
        }
    })
}

function inserirUsuario(usuario) {
    const id = listaUsuarios.length + 1
    usuario.id = id
    listaUsuarios.push(usuario)
}

function alterarUsuario(id, usuario) {
    const index = listaUsuarios.findIndex(e => e.id == id)
    usuario.id = id
    listaUsuarios[index] = usuario
}

function deletarUsuario(id) {
    const index = listaUsuarios.findIndex(e => e.id == id)
    listaUsuarios.splice(index, 1)
}

module.exports = { router, buscarUsuarios, buscarUsuario, inserirUsuario, alterarUsuario, deletarUsuario }