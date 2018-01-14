const Hapi = require("hapi");
const Good = require("good");

const server = Hapi.server({
  host: "localhost",
  port: 8000
});

// Add the route
server.route({
  method: "GET",
  path: "/{name?}",
  handler: function(r) {
    const { params: { name } } = r;
    return `<h1>Hello, ${name || "World"}!</h1>`;
  }
});

// Start the server
async function start() {
  try {
    await server.register({
      plugin: Good,
      options: {
        ops: {
          interval: 1000
        },
        reporters: {
          myConsoleReporter: [
            {
              module: "good-squeeze",
              name: "Squeeze",
              args: [{ log: "*", response: "*" }]
            },
            {
              module: "good-console"
            },
            "stdout"
          ]
        }
      }
    });
    await server.start();
  } catch (err) {
    server.log(err);
    process.exit(1);
  }

  server.log("Server running at:", server.info.uri);
}

start();
