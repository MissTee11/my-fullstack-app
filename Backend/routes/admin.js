const express = require('express');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.get('/admin-data', auth, isAdmin, (req, res) => {
  res.json({ msg: `Welcome admin user ${req.user.id}` });
});

module.exports= router;