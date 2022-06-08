const express = require("express")
const router = express.Router()

const listaBoletos = [
    { id: 1, valor: 750, status: "Pendente", id_usuario: 4, id_pessoa: 4, nome_pessoa: "josé" },
    { id: 2, valor: 1500, status: "Pendente", id_usuario: 4, id_pessoa: 4, nome_pessoa: "josé" },
    { id: 3, valor: 380, status: "Pago", id_usuario: 2, id_pessoa: 2, nome_pessoa: "josefina" },
]

const listaUsuarios = [
    { id: 1, nome: "jose_valdo", senha: 123 },
    { id: 2, nome: "jose_fina", senha: 132 },
    { id: 3, nome: "jo_se", senha: 213 },
    { id: 4, nome: "jo_s&e", senha: 231 },
]

const listaPessoas = [
    { id: 1, nome: "josevaldo", cpf: 123 },
    { id: 2, nome: "josefina", cpf: 132 },
    { id: 3, nome: "jose", cpf: 213 },
    { id: 4, nome: "josé", cpf: 231 },
]

module.exports = { router, listaBoletos, listaPessoas, listaUsuarios }