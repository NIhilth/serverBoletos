const express = require("express")
const boletos = require("./boletos")
const router = express.Router()

const listaPessoas = [
    { id: 1, nome: "josevaldo", cpf: 123 },
    { id: 2, nome: "josefina", cpf: 132 },
    { id: 3, nome: "jose", cpf: 213 },
    { id: 4, nome: "josé", cpf: 231 },
]

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

router.get('/', (req, res) => {
    res.send(buscarPessoas())
})

router.get('/:id', (req, res) => {
    res.send(buscarPessoa(req.params.id))
})

router.post('/', (req, res) => {
    if (req.body.nome != null && req.body.cpf != null) {
        const pessoa = req.body
        const id = listaPessoas.length + 1
        pessoa.id = id
        listaPessoas.push(pessoa)
        res.json(pessoa)
    } else {
        res.status(400).send("Não foi informado o body apropriadamente")
    }
})

router.put('/:id', (req, res) => {
    const pessoa = req.body
    const id = req.params.id
    const index = listaPessoas.findIndex(e => e.id == id)
    pessoa.id = id
    listaPessoas[index] = pessoa
    res.json(pessoa)
})

router.delete('/:id', (req,res) => {
    const id = req.params.id
    const listaBoletos = boletos.buscarBoletosdaPessoa(id)
    if(listaBoletos == ""){
        const index = listaPessoas.findIndex(e => e.id == id)
        listaPessoas.splice(index, 1)
        res.json(listaPessoas)
    } else {
        res.status(400).send("Essa pessoa tem um boleto pendente!")
    }
})

module.exports = {
    router,
    buscarPessoas,
    buscarPessoa
}