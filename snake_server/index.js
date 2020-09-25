const path = require('path');
const bodyParser = require('body-parser')
const express = require('express')

// default to port 3000
const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

// Add headers
app.use(function (req, res, next) {
  console.log("setting headers")

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:2000');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// define API requests 
app.get('/', handleIndex)
app.post('/start', handleStart)
app.post('/move', handleMove)
app.post('/end', handleEnd)
app.post('/add', handleAdd);

// for demonstration
app.post('/add', handleAdd);

app.listen(PORT, () => console.log(`Battlesnake Server listening at http://127.0.0.1:${PORT}`))

function handleAdd(request, response) {
  // just ES6 things :)
  const { a, b } = request.body;
  response.send({
    result: parseInt(a) + parseInt(b),
  })
}

function handleIndex(request, response) {
  var battlesnakeInfo = {
    apiversion: '1',
    author: 'Gabe Petersen',
    color: '#000000',
    head: 'bendr',
    tail: 'freckle'
  }

  response.status(200).json(battlesnakeInfo)
}

function handleStart(request, response) {
  var gameData = request.body

  // return status 200:ok
  console.log('START')
  response.status(200).send('ok')
}

function handleMove(request, response) {
  var gameData = request.body

  // currently select a random direction to move
  var possibleMoves = ['up', 'down', 'left', 'right']
  var move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]

  // move in that direction 
  console.log('MOVE: ' + move)
  response.status(200).send({
    move: move,
    shout: `I am moving ${move}!`
  })
}

function handleEnd(request, response) {
  var gameData = request.body

  console.log('END')
  response.status(200).send('ok')
}
