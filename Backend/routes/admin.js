import express from 'express';
import auth from '../middleware/auth';
import isAdmin from '../middleware/isAdmin';

const router = express.Router();

router.get('/admin-data', auth, isAdmin, (req, res) => {
  res.json({ msg: `Welcome admin user ${req.user.id}` });
});

export default router;