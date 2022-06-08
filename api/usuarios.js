const express = require("express")
const router = express.Router()
const funcoesUsuario = require("./funcoes/funcoesUsuario")
const funcoesBoleto = require("./funcoes/funcoesBoleto")

router.get('/', (req, res) => {
    res.send(funcoesUsuario.buscarUsuarios())
})

router.get('/:id', (req, res) => {
    res.send(funcoesUsuario.buscarUsuario(req.params.id))
})

router.post('/', (req, res) => {
    const usuario = req.body
    if (usuario.nome != null && usuario.senha != null && usuario.nome != "" && usuario.senha != "") {
        funcoesUsuario.inserirUsuario(usuario)
        res.json(usuario)
    } else {
        res.status(400).send("Não foi informado o body apropriadamente")
    }
})

router.put('/:id', (req, res) => {
    const usuario = req.body
    const id = req.params.id
    funcoesUsuario.alterarUsuario(id, usuario)
    res.json(usuario)
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const listaBoletos = funcoesBoleto.buscarBoletosDoUsuario(id)
    if (listaBoletos == "") {
        funcoesUsuario.deletarUsuario(id)
        res.json(funcoesUsuario.buscarUsuarios())
    } else {
        res.status(400).send("Esse usuário tem um boleto pendente!")
    }
})

module.exports = { router }