
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table){
        table.increments();//id autoincrement

        table.string('title').notNullable();
        table.string('descriptions').notNullable();
        table.decimal('value').notNullable();

        //criando o relacionamento dessa table. 
        table.string('ong_id').notNullable();
    
        //criando chave estrangeira
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function(knex) {
    return knex.schema.droTable('incidents');

};
