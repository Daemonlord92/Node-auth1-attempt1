const router = require('express').Router();
const User = require('./userModel.js');
const bcrypt = require('bcryptjs');

// GET ROUTES

router.get('/', (req, res) => {
	User.find()
	.then(users => res.status(200).json(users))
	.catch(err => res.status(500).json({ mes: 'Server Error', err}))
})

router.get('/:id', (req, res) => {
	User.findById(req.params.id)
	.then(users => res.status(200).json(users))
	.catch(err => res.status(500).json({mes: 'Server Error', err}))
})

 

module.exports = router;