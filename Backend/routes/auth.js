const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');


const router = express.Router();

router.post('/login', async(req,res)=>{
  const {username, password}= req.body;

  try{
    //find user by username
    const user= await pool.query('SELECT * FROM users WHERE username = $1',[username]);
    if(user.rows.length === 0) return res.status(400).json({msg:"Invalid credentials"});

    //compare password
    const matches = await bcrypt.compare(password, user.rows[0].password);
    if(!matches) return res.status(400).json({msg:"Invalid credentials"});

    //Create and return JWT
    const token= jwt.sign({id: user.rows[0].id, role: user.rows[0].role}, 
    process.env.JWT_SECRET, 
    {expiresIn: '1h'});
    res.json({token});
  }
  catch(err){
    res.status(500).send(err.message);
  }
});
module.exports= router;