import fastify from "fastify"
import { send } from "process"
import { IQuerystring, IHeaders } from "./interface"

const server = fastify({
    logger: {
        prettyPrint: true,
    },
})

server.get("/ping", async (request, reply) => {
    return "pong\n"
})
server.get<{
    Querystring: IQuerystring
    Headers: IHeaders
}>(
    "/auth",
    {
        preValidation: (request, reply, done) => {
            const { username, password } = request.query
            done(username !== "admin" ? new Error("Must be admin") : undefined) // only validate `admin` account
        },
    },
    async (request, reply) => {
        const customerHeader = request.headers["h-Custom"]
        // do something with request data
        return reply.send(customerHeader)
    }
)
server.listen(8080, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})