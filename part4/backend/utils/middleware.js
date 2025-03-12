const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if(error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({error: 'expected `username` to be unique'})
  } else if(error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } 

  console.log("logger =====>", error.name)

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  console.log("request middleware:", authorization);

  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '');
    console.log("token:", token);
    request.token = token;  // Store the token on the request object
  } else {
    request.token = null; // Set token to null if not present
  }

  next(); // Call next() to move to the next middleware or route handler
}

const userExtractor = async (request, response, next) => {
  console.log("token in userExtractor: ", request.token)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({error: 'token invalid'})
  }
  
  const user = await User.findById(decodedToken.id)
  request.user = user;

  next()
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}