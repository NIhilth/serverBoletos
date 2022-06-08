const express = require("express")
const router = express.Router()
const funcoesBoleto = require("./funcoes/funcoesBoleto")
const funcoesUsuario = require("./funcoes/funcoesUsuario")
const funcoesPessoa = require("./funcoes/funcoesPessoa")

router.get('/', (req, res) => {
    res.send(funcoesBoleto.buscarBoletos())
})

router.get('/:id', (req, res) => {
    res.send(funcoesBoleto.buscarBoleto(req.params.id))
})

router.get('/pessoa/:id', (req, res) => {
    const listaBoletosPessoa = funcoesBoleto.buscarBoletosDaPessoa(req.params.id)
    res.send(listaBoletosPessoa)
})

router.post('/', (req, res) => {
    const boleto = req.body
    const pessoa = funcoesPessoa.buscarPessoa(boleto.id_pessoa)
    const usuario = funcoesUsuario.buscarUsuario(boleto.id_usuario)
    if (pessoa != null && usuario != null) {
        if (boleto.valor > 0) {
            funcoesBoleto.inserirBoleto(boleto)
            res.json(boleto)
        } else {
            res.status(400).send("Valor menor ou igual a 0!")
        }
    } else {
        res.status(400).send("A pessoa ou o usuário informado não existe!")
    }
})

router.put('/:id', (req, res) => {
    const boleto = req.body
    const id = req.params.id
    funcoesBoleto.alterarBoleto(id, boleto)
    res.json(boleto)
})

module.exports = { router }