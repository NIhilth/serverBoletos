const express = require("express")
const boletos = require("./boletos")
const router = express.Router()

const listaUsuarios = [
    {id: 1,nome: "jose_valdo",senha: 123},
    {id: 2,nome: "jose_fina",senha: 132},
    {id: 3,nome: "jo_se",senha: 213},
    {id: 4,nome: "jo_s&e",senha: 231},
]

function buscarUsuarios(){
    return listaUsuarios
}

function buscarUsuario(id){
    return listaUsuarios.find(e => {
        if(e.id == id){
            return e
        }
    })
}

router.get('/', (req, res) => {
    res.send(buscarUsuarios())
})

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    res.send(buscarUsuario(req.params.id))
})

router.post('/', (req, res) => {
    if (req.body.nome != null && req.body.senha != null) {
        const usuario = req.body
        const id = listaUsuarios.length + 1
        usuario.id = id
        listaUsuarios.push(usuario)
        res.json(usuario)
    } else {
        res.status(400).send("Não foi informado o body apropriadamente")
    }
})

router.put('/:id', (req, res) => {
    const usuario = req.body
    const id = req.params.id
    const index = listaUsuarios.findIndex(e => e.id == id)
    usuario.id = id
    listaUsuarios[index] = usuario
    res.json(usuario)
})

router.delete('/:id', (req,res) => {
    const id = req.params.id
    const listaBoletos = boletos.buscarBoletosdaPessoa(id)
    if(listaBoletos == ""){
        const index = listaUsuarios.findIndex(e => e.id == id)
        listaUsuarios.splice(index, 1)
        res.json(listaUsuarios)
    } else {
        res.status(400).send("Essa pessoa tem um boleto pendente!")
    }
})

module.exports = {
    router,
    buscarUsuarios,
    buscarUsuario
}