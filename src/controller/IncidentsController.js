const connection = require('../database/connection');

module.exports = {
    //listagem de dados
    async index(req, res){
        const { page = 1 } = req.query;

        const [count] = await connection('incidents').count();

        console.log(count);
        
        //Esquema de paginação e limitando o numero 
        //que vem do bd 
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select('incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf');

        //Enviado para o cabeçalho o tatal de registro
        res.header('X-Total-Count', count['count(*)']);

        return res.json(incidents);
    },

    //criação de dados
    async create(req, res){
        //dados da autenticação do usuario
        //Tudo que caracteristica contexto da requisição fica no headers
        const { title, descriptions, value } = req.body;
        const ong_id = req.headers.authorization;
        const data = req.body;

        //o primeiro valor do array será armazenada em uma variavel chamada id
        const [id] = await connection('incidents').insert({
            title,
            descriptions,
            value,
            ong_id,
        });

        console.log(data);
        
        return res.json({ id });
    },
    //deletando dados
    //first retorna uma resultado
    async delete(req, res){
        const { id } = req.params;
        const ong_id = req.headers.authorization;
        const incidents = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        //incidents.ong_id result da busca
        if(incidents.ong_id != ong_id){
            return res.status(401).json('Operação não autorizada');
        }    

        await connection('incidents').where('id', id).delete();

        return res.status(204).send();

    }

};

