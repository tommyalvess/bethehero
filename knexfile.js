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
  }

};
