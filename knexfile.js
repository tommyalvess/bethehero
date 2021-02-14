// Update with your config settings.

module.exports = {
//ambiente na nossa maquina
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true, // O padrão Sqlite não aceita inserção de default values.
     
  },
// simula a preodução p/ time dev possa testar online
  staging: {
    client: 'mysql',
    connection: {
      host : '160.153.92.200',
      database: 'dbapptransescolar',
      user:     'app_transescolar',
      password: 'app125517',
      charset: 'utf8'
    },
    migrations: {
      directory: './src/database/migrations'
    }
  },
//ambiente para o cliente acessar 
  production: {
    client: 'pg',
    connection: {
      host : 'ec2-67-202-63-147.compute-1.amazonaws.com',
      user : 'jzsyfklxvbgemp',
      password : 'f4c597801bc729884f6f1c07f4deb6f44e8609f139f03d38f950d6f099895c28',
      database : 'dc4f3b5q6k6bsq'
    },
    migrations: {
      directory: './src/database/migrations'
    }
  }

};
