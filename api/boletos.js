const express = require("express")
const pessoas = require("./pessoas")
const usuarios = require("./usuarios")
const router = express.Router()


const listaBoletos = [
    { id: 1, valor: 750, status: "Pendente", id_usuario: 4, id_pessoa: 4, nome_pessoa: "josé" },
    { id: 2, valor: 1500, status: "Pendente", id_usuario: 4, id_pessoa: 4, nome_pessoa: "josé" },
    { id: 3, valor: 380, status: "Pago", id_usuario: 2, id_pessoa: 2, nome_pessoa: "josefina" },
]

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

function buscarBoletosdaPessoa(id) {
    const listaBoletosPessoa = []
    listaBoletos.forEach(e => {
        if (e.id_pessoa == id) {
            listaBoletosPessoa.push(e)
        }
    })
    return listaBoletosPessoa
}

function buscarBoletosdoUsuario(id) {
    const listaBoletosUsuario = []
    listaBoletos.forEach(e => {
        if (e.id_usuario == id) {
            listaBoletosUsuario.push(e)
        }
    })
    return listaBoletosUsuario
}

function inserirBoleto(boleto) {
    listaBoletos.push(boleto)
}

function alterarBoleto(index, boleto) {
    listaBoletos[index] = boleto
}

router.get('/', (req, res) => {
    res.send(buscarBoletos())
})

router.get('/:id', (req, res) => {
    res.send(buscarBoleto(req.params.id))
})

router.get('/pessoa/:id', (req, res) => {
    const listaBoletosPessoa = buscarBoletosdaPessoa(req.params.id)
    res.send(listaBoletosPessoa)
})

router.post('', (req, res) => {
    const boleto = req.body
    console.log("USUARIOOOOO", usuarios.buscarUsuario(boleto.id_usuario))
    console.log("PESSOAAA", pessoas.buscarPessoa(boleto.id_pessoa))
    const pessoa = pessoas.buscarPessoa(boleto.id_pessoa)
    const usuario = usuarios.buscarUsuario(boleto.id_usuario)
    if (pessoa != null && usuario != null) {
        if (boleto.valor > 0) {
            const id = listaBoletos.length + 1
            boleto.id = id
            inserirBoleto(boleto)
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
    const index = listaBoletos.findIndex(e => e.id == id)
    boleto.id = id
    alterarBoleto(index, boleto)
    res.json(boleto)
})

module.exports = {
    router,
    buscarBoletos,
    buscarBoleto,
    buscarBoletosdaPessoa,
    buscarBoletosdoUsuario,
    inserirBoleto,
    alterarBoleto,
}