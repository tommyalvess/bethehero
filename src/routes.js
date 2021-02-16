const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');


const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const OngsController = require('./controller/OngsController');
const IncidentsController = require('./controller/IncidentsController');
const PerfileOngsController = require('./controller/PerfileOngsController');
const SessionControler = require('./controller/SessionControler');


const routes = express.Router();



//Rota /Recurso

// Tipos de parametros 
//Query: enviamos na rota apos "?" (filtros, paginação)
//Route: para identificar recursos
// Resquest Body: criar ou alterar o recurso


routes.get('/profile', PerfileOngsController.index);

routes.post('/sessions', SessionControler.create);

routes.get('/ongs', OngsController.index);
routes.get('/ong/:id', OngsController.show);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        whatsapp: Joi.number().required().min(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngsController.create);
routes.delete('/ongs/:id', OngsController.delete);
routes.put('/ong/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        whatsapp: Joi.number().required().min(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
 }), OngsController.update);


routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        descriptions: Joi.string().required(),
        value: Joi.number().required(),
    })
}), IncidentsController.create);
routes.get('/incidents', IncidentsController.index);
routes.delete('/incident/:id', IncidentsController.delete);
routes.put('/incident/:id',celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        descriptions: Joi.string().required(),
        value: Joi.number().required(),
    })
}), 
IncidentsController.update);


module.exports = routes;