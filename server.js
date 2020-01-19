const express = require('express')
// const { createServer } = require('http')
// const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT = 9500

app.prepare()
    .then(() => {
        const server = express()
        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(PORT, (err) => {
            if (err) throw err
            console.log(`[ ready ] http://localhost:${PORT}`)
        })
    })
    .catch((ex) => {
        console.log(ex.stack);
        process.exit(1)
    })