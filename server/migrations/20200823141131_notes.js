exports.up = function(knex) {
    return knex.schema.createTable("notes", table => {
        table.increments("id").primary();
        table.integer('user_id').unsigned();
        table.string("title");
        table.text("text", 'longtext');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        
        table.foreign('user_id').references('id').inTable('users');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("notes");
};