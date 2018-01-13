const Hapi = require("hapi");
const Good = require("good");

const server = Hapi.server({
  host: "localhost",
  port: 8000
});

// Add the route
server.route({
  method: "GET",
  path: "/",
  handler: function(request, h) {
    return "<h1>Hello, world!</h1>";
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
    console.log(err);
    process.exit(1);
  }

  console.log("Server running at:", server.info.uri);
}

start();
