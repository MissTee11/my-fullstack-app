const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../db');
require('dotenv').config();

const router = express.Router();

router.post('/login', async(req,res)=>{
  const {username, password}= req.body;//login input from user
  console.log('Login request received:', { username, password });


  try{
    //find user by username
    const user= await pool.query('SELECT * FROM users WHERE username = $1',[username]);
    console.log('👤 User query result:', user.rows);
    if(user.rows.length === 0) return res.status(400).json({msg:"Invalid credentials"});

    //compare password
    const matches = await bcrypt.compare(password, user.rows[0].password_hash);
    if(!matches) return res.status(400).json({msg:"Invalid credentials"});

    //Create and return JWT
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const token= jwt.sign({id: user.rows[0].id, role: user.rows[0].role}, 
    process.env.JWT_SECRET, 
    {expiresIn: '1h'});
    console.log('✅ JWT created:', token);
    res.json({token});
  }
  catch(err) {
  console.error("LOGIN ERROR:", err);
  res.status(500).json({ msg: "Server error", error: err.message });
}
});
module.exports= router;

/*JWT- JSON Web Token
it is a secire encoded token that identifies the user, is signed with a secret key so it is not tampered with and is used for stateless
authentication*/