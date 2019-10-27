exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('taquerias', t => {
      t.increments('id').index();

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
        { name: 'El Ratón', specialty: 'tortas', rating: '🌮🌮🌮' },
        { name: 'Sr.Taco', specialty: 'barbacoa', rating: '🌮🌮' },
        { name: 'Taco Fish', specialty: 'camarón', rating: '🌮🌮🌮' },
        {
          name: 'Harry Potter Y La Orden del Taco',
          specialty: 'chile relleno',
          rating: '🌮'
        },
        { name: 'Ricos Tacos', specialty: 'pastor', rating: '🌮🌮' },
        {
          name: 'Tacos Obregón',
          specialty: 'tacos al pastor',
          rating: '🌮🌮🌮'
        },
        {
          name: 'Hoy Cena Pancho',
          specialty: 'tacos de barbacoa',
          rating: '🌮🌮🌮'
        },
        { name: 'El Escuadrón', specialty: 'montados', rating: '🌮🌮' },
        { name: 'La Cubanita', specialty: 'al pastor', rating: '🌮🌮' },
        { name: 'Changolin', specialty: 'gringas', rating: '🌮🌮🌮' },
        { name: 'Cande', specialty: 'costilla', rating: '🌮' },
        { name: "Derek's Tacos", specialty: 'ugh', rating: '🌮' },
        { name: 'De Carranza', specialty: 'al pastor', rating: '🌮🌮🌮' },
        { name: 'Chingones', specialty: 'barbacoa', rating: '🌮🌮🌮' },
        { name: "Ricky's Tacos", specialty: 'al pastor', rating: '🌮🌮' },
        { name: 'Apestosas', specialty: 'hamburguesas', rating: '🌮🌮🌮' }
      ]);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('taquerias');
};
