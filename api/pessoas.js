const express = require("express")
const router = express.Router()
const funcoesPessoa = require("./funcoes/funcoesPessoa")
const funcoesBoleto = require("./funcoes/funcoesBoleto")

router.get('/', (req, res) => {
    res.send(funcoesPessoa.buscarPessoas())
})

router.get('/:id', (req, res) => {
    res.send(funcoesPessoa.buscarPessoa(req.params.id))
})

router.post('/', (req, res) => {
    const pessoa = req.body
    if (pessoa.nome != null && pessoa.cpf != null && pessoa.nome != "" && pessoa.cpf != "") {
        funcoesPessoa.inserirPessoa(pessoa)
        res.json(pessoa)
    } else {
        res.status(400).send("Não foi informado o body apropriadamente")
    }
})

router.put('/:id', (req, res) => {
    const pessoa = req.body
    const id = req.params.id
    funcoesPessoa.alterarPessoa(id, pessoa)
    res.json(pessoa)
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const listaBoletos = funcoesBoleto.buscarBoletosDaPessoa(id)
    if (listaBoletos == "") {
        funcoesPessoa.deletarPessoa(id)
        res.json(funcoesPessoa.buscarPessoas())
    } else {
        res.status(400).send("Essa pessoa tem um boleto pendente!")
    }
})

module.exports = { router }