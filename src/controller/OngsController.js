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
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        console.log(data);

        return res.json({id});
    },

    async delete(req, res){
        const { id } = req.params;
        const idO = req.headers.authorization;

        function isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }

        try {
            const find = await connection('ongs').where('id', id)
            .select('*');

            if(!isEmpty(find)){
                    
                const ongs = await connection('ongs')
                .where('id', id)
                .select('id')
                .first();
                //incidents.ong_id result da busca
                if(ongs.id != idO){
                    return res.status(401).json('Operação não autorizada');
                }    
                await connection('ongs').where('id', id).delete();
                return res.status(200).json({"msg": "Deletado com sucesso!"});

            }else{
                return res.status(500).json("Nada Localizado!");
            }             
        } catch (error) {
            console.log(error);
            return res.status(500).json("Erro! Tente novamente...");
        } 

    },

    show(req, res){
        return res.status(200).json("'FOii'");     
    }
};