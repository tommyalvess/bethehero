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
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
//ambiente para o cliente acessar 
  production: {
    client: 'sqlite3',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true, // O padrão Sqlite não aceita inserção de default values.
  }

};
