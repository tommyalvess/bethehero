//Serve para criptografia
//Mas usar um metodo p gerar uma string aleatoria.
const crypto = require('crypto');
const connection = require('../database/connection');

// quando o noide chegar nesse codigo ele vai esperar e depois continuar.
//declaramos o async e colocamos o await
module.exports = {

    async index(req, res) {
        const ongs = await connection('ongs').select('*');
        return res.json(ongs);
    },

    async create(req, res){
        const {name, email, whatsapp, city, uf} = req.body;
        const data = req.body;
        
        const id = crypto.randomBytes(4).toString('HEX');
        
        await connection('ongs').insert({
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        console.log(data);

        return res.json({id});
    },

    show(req, res){
        return res.status(200).json("'FOii'");     
    }
};