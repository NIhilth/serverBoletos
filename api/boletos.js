const express = require("express")
//const pessoas = require("./pessoas")
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
        if(e.id_pessoa == id){
            listaBoletosPessoa.push(e)
        }
    })
    return listaBoletosPessoa
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

//fazer post

router.put('/:id', (req, res) => {
    const boleto = req.body
    const id = req.params.id
    const index = listaBoletos.findIndex(e => e.id == id)
    boleto.id = id
    listaBoletos[index] = boleto
    res.json(boleto)
})

module.exports = {
    router,
    buscarBoletos,
    buscarBoleto,
    buscarBoletosdaPessoa
}