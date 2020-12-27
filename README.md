# Demonstration of `webpack-dev-server` Issue


## Setup - Docker

1. Make sure you have Docker installed
1. Clone this repo
1. `docker build -t webpack-dev-server-bug ./`
   * This might take a while
1. `docker-compose up`
   * This will start the container running `tail`.  You will need to log into it
1. `docker ps | grep webpack-dev-server-bug`
   * Note that container ID.  Copy this into your pasteboard.
1. `docker exec -it «container ID» bash`
   * You are now inside the Docker container
1. `cd app`
1. `yarn install`
1. `$(yarn bin)/webpack serve --config=config/webpack.js --env=development`
  * The server is running on port 3000 of the Docker container, but exposed as port 8888 on your machine
1. Navigate to `http://localhost:8888` on the machine where you are running Docker.
1. Open the console.  You should see the error.

## Setup - Not Docker

1. Clone this repo
1. `cd app`
1. `yarn install`
1. Edit `config/webpack.js` and replace `devServer` with:

   ```json
   devServer: {
	   port: 3000,
	   contentBase: "./development"
   }
   ```
1. `$(yarn bin)/webpack serve --config=config/webpack.js --env=development`
1. Navigate to `http://localhost:3000`.
1. Open the console.  You should see the error.

**NOTE** I have not tried this—I run everything in Docker.

## To "fix" the error

1. Edit `node_modules/webpack-dev-server/client/index.js`
1. On line 10, you should see this:

   ```javascript
   var overlay = require('./overlay');
   ```
1. Replace it with this:

   ```javascript
   var overlay = {};
   ```
1. `$(yarn bin)/webpack serve --config=config/webpack.js --env=development`
1. Navigate to `http://localhost:3000`.
1. Open the console.  You should not see the error—everything is working.  You can prove this by editing `html/index.html` and seeing it
   reload with the change.

