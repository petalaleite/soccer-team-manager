const express = require('express');

const app = express();

app.use(express.json());

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
  const team = teams.find(({ id }) => id === Number(req.params.id))

  if (!team) {
    res.status(404).send('<h1>Team not found</h1>')
  }
  res.status(200).json(team.name);
})

app.post('/teams', (req, res) => {
  const newTeam = { ...req.body };
  teams.push(newTeam);

  res.status(201).json({ team: newTeam })
})

app.put('/teams/:id', (req, res) => {
  const { id } = req.params;
  const { name, nickname } = req.body;

  const updateTeam = teams.find((team) => team.id === Number(id));

  if (!updateTeam) {
    res.status(404).json({ message: 'Team not found' });
  }

  updateTeam.name = name;
  updateTeam.nickname = nickname;
  res.status(200).json({ updateTeam });
})

app.delete('/teams/:id', (req, res) => {
  const { id } = req.params;
  const arrayPosition = teams.findIndex((team) => team.id === Number(id));
  teams.splice(arrayPosition, 1);

  res.status(200).end();
})

module.exports = app;