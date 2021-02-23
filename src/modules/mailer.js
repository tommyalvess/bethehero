const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const { host, port, user, pass} = require('../config/mail.json');

const transport = nodemailer.createTransport({
    host,
    port, 
    auth: {
        user,
        pass
    },

});

//modulo que possibilita trabalhar com tampletes de email utilizando node

const handlebarOptions = {
    viewEngine: {
        extName: '.handlebars',
        partialsDir: 'src/views',
        layoutsDir: 'src/views/layouts',
        defaultLayout: 'main.handlebars',
      }, 
    viewPath: path.resolve('./src/resource/mail'),
    extName: '.html'
  };

transport.use('compile', hbs(handlebarOptions));

module.exports = transport;