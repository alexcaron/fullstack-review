const express = require('express');
let app = express();
const path = require('path');
const getReposByUsername = require(path.join(__dirname, '../helpers/github.js')).getReposByUsername;
const saveRepos = require(path.join(__dirname, '../database/index.js')).save;
app.use(express.json());
// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static(path.join(__dirname, '../client/dist')));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  getReposByUsername(req.body.username)
  .then((response) => {
    const repos = response.data;
    return saveRepos(repos);
  })
  .then(() => {
    res.sendStat(201);
  })
  .catch((err) => {
    res.send(err);
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

