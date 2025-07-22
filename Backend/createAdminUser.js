//Add admin user credentials to database with hashed password using bcrypt
//Storing passwords as plain text is a security risk
const bcrypt = require('bcrypt');
const pool = require('./db.js');

async function createAdmin() {
  const username = 'Admin';
  const password = 'admin123!'; 
  const role = 'admin';

  const hashedPassword = await bcrypt.hash(password, 10);//hashing password
  //Adds random salt. 10 is the number of salt rounds

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

/*Definition of terms
Salt- a random string of characters added to a password before hashing it to make each password unique
Salt rounds- the number of times the hashinh algorithm runs on salted password.*/
