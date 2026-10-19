const { WebSocketServer } = require("ws")

const wss = new WebSocketServer({ port: process.env.PORT || 8080 })

wss.on("connection", (ws) => {
    console.log("Client connecté — total:", wss.clients.size)

    ws.on("message", (data) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === 1) {
                client.send(data.toString())
            }
        })
    })

    ws.on("close", () => {
        console.log("Client déconnecté — total:", wss.clients.size)
    })
})

console.log("✓ Relay WS actif")