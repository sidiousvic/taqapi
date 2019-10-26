exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('taquerias', t => {
      t.increments().index();

      t.string('name')
        .notNullable()
        .index();

      t.string('specialty')
        .notNullable()
        .index();

      t.string('rating').index();
    })
    .then(() => {
      return knex('taquerias').insert([
        { name: 'El Ratón', specialty: 'tortas de jamón', rating: '***' },
        { name: 'Sr.Taco', specialty: 'tacos de barbacoa', rating: '**' },
        { name: 'Taco Fish', specialty: 'tacos de camarón', rating: '***' },
        {
          name: 'Harry Potter y la Orden del Taco',
          specialty: 'tacos de chile verde',
          rating: '*'
        },
        { name: 'Ricos Tacos', specialty: 'tacos al pastor', rating: '**' },
        { name: 'Tacos Obregón', specialty: 'tacos al pastor', rating: '***' },
        {
          name: 'Hoy Cena Pancho',
          specialty: 'tacos de barbacoa',
          rating: '***'
        },
        { name: 'El Escuadrón', specialty: 'montados', rating: '**' },
        { name: 'La Cubanita', specialty: 'tacos al pastor', rating: '***' },
        { name: 'Changolin', specialty: 'gringas', rating: '***' },
        { name: 'Cande', specialty: 'tacos de costilla', rating: '**' }
      ]);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('taquerias');
};
