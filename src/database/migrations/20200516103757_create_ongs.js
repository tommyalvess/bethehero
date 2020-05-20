
//Ele é responsavel pela criação da tabela
exports.up = function(knex) {
    //knex.schema.createTable(tableName, callback)
   return knex.schema.createTable("ongs", function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); // 2 e o segunto paramentro, falando que tera dois caracteres
    });
};
//Deu problema e quero deletar a tabela
exports.down = function(knex) {
  return knex.schema.droTable('ongs');
};
