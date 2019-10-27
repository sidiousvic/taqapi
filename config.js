module.exports = {
  db: {
    client: 'pg',
    connection: process.env.DB_URL || {
      host: process.env.DB_HOST || 'ec2-54-235-163-246.compute-1.amazonaws.com',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'd8kc4ea1kq7jb6',
      user: process.env.DB_USER || 'eazczcapkbjgtk',
      password:
        process.env.DB_PASSWORD ||
        '74ef9bad13609360e0b1506a4e568b2c9b7a7950877e4d6358316ddbb626ef35'
    }
  }
};
