const axios = require('axios');
const db = require('../database/dbConfig');
const jwt = require('jsonwebtoken');
const jwtKey = require('../_secrets/keys').jwtKey;
const bcrypt = require('bcryptjs');

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  
  //Destructure the body
  let {username,password} = req.body;
  
  //Has the password:
  password = bcrypt.hashSync(password, 10);
  
  //Create a JWT with payload, secret and expiration
  const token = jwt.sign({data: username}, jwtKey, { expiresIn: '1h' });

  db('users').insert({username,password})
    //Send token back to client
    .then(data => res.status(200).json({token}))
    .catch(err => res.status(400).json(err))
  }
  
  function login(req, res) {
    // implement user login
    const {username,password} = req.body;
    
    //Get the hashed password for this user
    db('users').where({username}).select('password')
    .then(data => {

      //See if matches
      !bcrypt.compareSync(password, data[0].password) ? res.status(400).json({err:"Invalid Credentials"}) : res.status(200).json({msg:'Login successful!'})

    })
    .catch(err => res.status(400).json(err))

}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
