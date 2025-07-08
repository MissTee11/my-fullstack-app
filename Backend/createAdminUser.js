//Add admin user credntials to database with hashed password using bcrypt
const bcrypt = require('bcrypt');
const pool = require('./db.js');

async function createAdmin() {
  const username = 'Admin';
  const password = 'admin123!'; 
  const role = 'admin';

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    'INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3)',
    [username, hashedPassword, role]
  );

  console.log('Admin user created successfully!');
  await pool.end();
}

createAdmin().catch(err => {
  console.error('Error creating admin user:', err);
  pool.end();
});


