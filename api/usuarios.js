const express = require("express")
const { boletos }= require("./boletos")
const router = express.Router()

const listaUsuarios = [
    { id: 1, nome: "jose_valdo", senha: 123 },
    { id: 2, nome: "jose_fina", senha: 132 },
    { id: 3, nome: "jo_se", senha: 213 },
    { id: 4, nome: "jo_s&e", senha: 231 },
]

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

router.get('/', (req, res) => {
    res.send(buscarUsuarios())
})

router.get('/:id', (req, res) => {
    res.send(buscarUsuario(req.params.id))
})

router.post('/', (req, res) => {
    const usuario = req.body
    if (usuario.nome != null && usuario.senha != null && usuario.nome != "" && usuario.senha != "") {
        inserirUsuario(usuario)
        res.json(usuario)
    } else {
        res.status(400).send("Não foi informado o body apropriadamente")
    }
})

router.put('/:id', (req, res) => {
    const usuario = req.body
    const id = req.params.id
    alterarUsuario(id, usuario)
    res.json(usuario)
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const listaBoletos = boletos.buscarBoletosDoUsuario(id)
    if (listaBoletos == "") {
        deletarUsuario(id)
        res.json(listaUsuarios)
    } else {
        res.status(400).send("Esse usuário tem um boleto pendente!")
    }
})

module.exports = {
    router,
    buscarUsuarios,
    buscarUsuario,
    inserirUsuario,
    alterarUsuario,
    deletarUsuario,
}