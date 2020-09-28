# Movies & Trailers React App
This app searchs for movies and its trailers from an api that is implemented in [movie-trailers-api](https://github.com/deniztraka/movie-trailers-api "movie-trailers-api") repository.

** Additionally, I just want to thank you the guys who made a react app, up and running in minutes with this [repository](https://github.com/mars/heroku-cra-node "repository") which this repository is forked from.**

[Demo Page](https://react-app-test-dt.herokuapp.com "https://react-app-test-dt.herokuapp.com")

## C4 Solution Architecture
[![C3 Solution Diagram](https://raw.githubusercontent.com/deniztraka/heroku-cra-node/master/assets/Web%20Site%20-%20C4%20Solution%20Diagram.png "C3 Solution Diagram")](https://raw.githubusercontent.com/deniztraka/heroku-cra-node/master/assets/Web%20Site%20-%20C4%20Solution%20Diagram.png "C3 Solution Diagram")

React App is served from a Node.js Express Api in same instance running on Heroku.
You can check the demo page from the link below.
[https://react-app-test-dt.herokuapp.com](https://react-app-test-dt.herokuapp.com "https://react-app-test-dt.herokuapp.com")

Node.js Express server is responsible for serving required data to React App.
It has two endpoints.
-- api/movies
-- api/trailers

Node.js express server is also responsible for making making calls to authorization server to refresh auth token for each request made to theese endpoints.

It is integrated with an api that is implemented in [movie-trailers-api](https://github.com/deniztraka/movie-trailers-api "movie-trailers-api") repository.

##### Known issues
Currently there is no security check on this app.

## Local Development

Because this app is made of two npm projects, there are two places to run `npm` commands:

1. **Node API server** at the root `./`
1. **React UI** in `react-ui/` directory.

### Run the API server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for Node

```bash
npm install package-name --save
```


### Run the React UI

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"` config](react-ui/package.json))

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd react-ui/

# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for React UI

```bash
# Always change directory, first
cd react-ui/

npm install package-name --save
```
