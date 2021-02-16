const { update } = require('../database/connection');
const connection = require('../database/connection');

const helpers = require('../utils/helper');

module.exports = {
    //listagem de dados
    async index(req, res){
        const { page = 1 } = req.query;

        const [count] = await connection('incidents').count({count: '*'});
        
        //Esquema de paginação e limitando o numero 
        //que vem do bd 
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select('incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf');

        //Enviado para o cabeçalho o tatal de registro
        res.header('X-Total-Count', count.count);
        console.log(count.count);

        return res.json(incidents);
    },

    //criação de dados
    async create(req, res){
        //dados da autenticação do usuario
        //Tudo que caracteristica contexto da requisição fica no headers
        
            const { title, descriptions, value } = req.body;
            const ong_id = req.headers.authorization;

            //o primeiro valor do array será armazenada em uma variavel chamada id
            await connection('incidents').insert({
                title,
                descriptions,
                value,
                ong_id,
            }).catch(error => {
                var err = error.response.data.errors
                console.log(err);
            });
            
            return res.status(200).json({"msg": "Inserido com sucesso!"});
       
    },

    //deletando dados
    async delete(req, res){
       
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        try {
            const find = await connection('incidents').where('id', id)
            .select('id')
            .first();

            if(!helpers.isEmpty(find)){

                const incidents = await connection('incidents')
                .where('id', id)
                .select('ong_id')
                .first();
                //incidents.ong_id result da busca
                if(incidents.ong_id != ong_id){
                    return res.status(401).json('Operação não autorizada');
                }    

                await connection('incidents').where('id', id).delete();
                return res.status(200).json({"msg": "Deletado com sucesso!"});
            }else{
                return res.status(500).json("Nada Localizado!");
            }      
        } catch (error) {
            console.log(error);
            return res.status(500).json("Erro! Tente novamente...");
        } 

    },

    //update incidente
    async update(req, res){

        const { title, descriptions, value } = req.body;
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const find = await connection('incidents')
        .where('id', id)
        .select('id')
        .first();
        
        if(!helpers.isEmpty(find)){

            try {
                const incidents = await connection('incidents')
                .where('id', id)
                .select('ong_id')
                .first();

                if(incidents.ong_id != ong_id){
                    return res.status(401).json('Operação não autorizada');
                }

                await connection('incidents')
                    .where('id', id)
                    .update({
                        title,
                        descriptions,
                        value,
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

