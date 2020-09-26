const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const superagent = require('superagent');
const dotenv = require('dotenv');
dotenv.config();

const apiHost = process.env.API_HOST;
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  async function fetchMoviesFromApi(authToken, searchPhrase) {
    try {
      var apiUrl = apiHost + "/api/v1/movies";
      var res = await superagent.get(apiUrl)
        .auth(authToken, { type: 'bearer' })
        .type('application/json')
        .query({ q: searchPhrase });
        return res.body.records;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function fetchFromTrailersApi(authToken, searchPhrase) {
    try {
      var apiUrl = apiHost + "/api/v1/trailers";
      var res = await superagent.get(apiUrl)
        .auth(authToken, { type: 'bearer' })
        .type('application/json')
        .query({ q: searchPhrase });
        return res.body.records;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function getAccesToken() {
    console.log("getting acces token");
    try {
      var res = await superagent.post(process.env.ISSUER + '/v1/token')
        .auth(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
        .type('application/x-www-form-urlencoded')
        .accept('application/json')
        .send({
          grant_type: 'client_credentials'
        })
        .send({
          scope: process.env.SCOPE
        });
    } catch (error) {
      //console.log(error);
      return null;
    }
    console.log("access token is succesfully fetched");
    return res.body.access_token;
  }

  // Answer movie endpoint requests.
  app.get('/api/movies', async function (req, res) {  
    var authToken = await getAccesToken();
    var apiResponse = await fetchMoviesFromApi(authToken, req.query.q);
    res.set('Content-Type', 'application/json');
    res.send(apiResponse);
  });

  // Answer API requests.
  app.get('/api/trailers', async function (req, res) {   
    var authToken = await getAccesToken();
    var apiResponse = await fetchFromTrailersApi(authToken, req.query.q);
    res.set('Content-Type', 'application/json');
    res.send(apiResponse);
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}