const express = require('express');

const app = express();

app.use(express.json());

let nextId = 6;
const teams = [
  {
    id: 1,
    name: 'Manchester United Football Club',
    nickname: 'Red Devils'
  },
  {
    id: 2,
    name: 'Chelsea Football Club',
    nickname: 'The Blues'
  },
  {
    id: 3,
    name: 'Tottenham Hotspur Football Club',
    nickname: 'Spurs'
  },
  {
    id: 4,
    name: 'Arsenal Football Club',
    nickname: 'The Gunners'
  },
  {
    id: 5,
    name: 'Everton Football Club',
    nickname: 'The Toffees'
  }
]

app.get('/teams', (req, res) => res.status(200).json({ teams }));

app.get('/teams/:id', (req, res) => {
  const id = Number(req.params.id);
  const team = teams.find(team => team.id === id)

  if (!team) {
    res.sendStatus(404)
  }
  res.json(team);
})

const validateTeam = (req, res, next) => {
  const requiredProperties = ['name', 'nickname']
  if (requiredProperties.every(property => property in req.body)) {
    next()
  } else {
    res.sendStatus(400)
  }
}

app.post('/teams', validateTeam, (req, res) => {
     const team = { id: nextId, ...req.body }
    team.push(team)
    nextId += 1
    res.status(201).json(team)
    res.sendStatus(400)
})

app.put('/teams/:id', validateTeam, (req, res) => {
  const id = Number(req.params.id)
  const team = teams.find(team => team.id === id)

  if (team) {
    const index = teams.indexOf(team)
    const updated = { id, ...req.body }
    teams.splice(index, 1, updated)
    res.status(201).json(updated)
  } else {
    res.sendStatus(400)
  }
})

app.delete('/teams/:id', (req, res) => {
const id = Number(req.params.id)
const team = teams.find(team => team.id === id)
if (team) {
  const index = teams.indexOf(team)
  teams.splice(index, 1)
}
res.sendStatus(204)
})

module.exports = app;