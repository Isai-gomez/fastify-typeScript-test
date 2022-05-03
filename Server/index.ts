import fastify from "fastify";
import socketioServer from "fastify-socket.io";
import path, { join } from "path";
const { readFile } = require("fs").promises;

const app = fastify({
  logger: {
    prettyPrint: true,
  },
});

app.register(socketioServer);
app.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/public/", // optional: default '/'
});

app.get("/", async (req, reply) => {
  const data = await readFile(join(__dirname, ".", "/public/index.html"));
  reply.header("content-type", "text/html; charset=utf-8");
  reply.send(data);
});

app.ready((err) => {
  if (err) throw err;
  app.io.on("connection", (socket) => {
    console.info("Socket connected!", socket.id);
    socket.on("chat:message", (message: string) => {
      console.log(message);
      app.io.emit("server:message", message);
    });
  });
});
console.log("Funciona");
app.listen(3000);
