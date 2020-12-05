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

 // ADD ROUTE

 router.post('/signup', (req, res) => {
 	let user = req.body

 	const hash = bcrypt.hashSync(user.password, 5)
 	user.password = hash
 	User.add(user)
 	.then(user => res.status(200).json(user))
 	.catch(err => res.status(500).json({mes:'Server Error', err}))
 })

 //LOGIN ROUTE

 router.post('/login', (req, res) => {
 	let { username, password } = req.body
 	User.findBy({username})
 	.first()
 	.then(user => {
 		if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.status(200).json({ message: `You are logged in, ${user.username}` });
    } else {
      res.status(401).json({ message: 'Not a Valid User!' });
    }
 	})
 	.catch(err => res.status(500).json({mes:'Server Error', err}))
 })

 // RESTRICTED ROUTES

 router.get('/restricted/users', authenticate, (req, res) => {
    User
    .find()
    .then(users => {
        res.json(users);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

//LOGOUT ROUTES

 router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                res.status(500).json({ error: 'Unable to log out!' })
            } else {
                res.status(200).json({ message: 'You are logged out!' })
            }
        })
    } else {
        res.status(200).json({ message: 'You are logged out!' })
    }
})


 function authenticate (req, res, next) {
  try {
    if(req && req.session && req.session.user) {
      next();
    } else {
      res.status(401).json({ errorMessage: 'Your credentials are invalid'})
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to authenticate'})
  }
}

module.exports = router;