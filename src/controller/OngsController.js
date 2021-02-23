//Serve para criptografia
//Mas usar um metodo p gerar uma string aleatoria.
const crypto = require('crypto');
const connection = require('../database/connection');
const helpers = require('../utils/helper');
const mailer = require('../modules/mailer');


// quando o noide chegar nesse codigo ele vai esperar e depois continuar.
//declaramos o async e colocamos o await
module.exports = {

    async show(req, res){
        const { id } = req.params;

        try {
            const ongs = await connection('ongs')
            .where('id', id)
            .select('*')
            .first();

            if(ongs === null || ongs === undefined){
                return res.status(500).json("Nada Localizado!");
            }else{
                return res.status(200).json(ongs);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json("Erro! Tente novamente...");
        }
        
    },

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

        mailer.sendMail({
            from: 'suporte@apptransescolar.com.br',
            to: email,
            subject: 'Seu ID',
            template: 'auth/forgotPass',
            context: { id },
        }, (err) => {
            console.log(err);
            if(err)
                return res.status(400).send({ error: 'Não foi possível enviar o email de recuperação de senha'});

            console.log('Foi');
            return res.json({id});
        });
    },

    async delete(req, res){
        const { id } = req.params;
        const idO = req.headers.authorization;

        try {
            const find = await connection('ongs')
            .where('id', id)
            .select('id')
            .first();

            if(!helpers.isEmpty(find)){
                    
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

    async update(req, res){

        const {name, email, whatsapp, city, uf} = req.body;           
        const { id } = req.params;
    
        const find = await connection('ongs').where('id', id)
        .select('id')
        .first();

        if(!helpers.isEmpty(find)){

            try {
                await connection('ongs').where('id', id).update({
                    name,
                    email,
                    whatsapp,
                    city,
                    uf,
                });
                return res.status(200).json({"msg": "Atualizado com sucesso!"});                
            } catch (error) {
                console.log(error);
                return res.status(500).json("Erro! Tente novamente...");
            }
        }else{
            return res.status(500).json("Nada Localizado!");
        }

    }
};