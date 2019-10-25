exports.up = function(knex, Promise) {
  return knex.schema.createTable('art', t => {
    t.increments().index();

    t.string('title')
      .notNullable()
      .index();

    t.string('author')
      .notNullable()
      .index();

    t.string('url').index();

    t.integer('year').index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
