const express = require("express")
const path = require("path")
const favicon = require("serve-favicon")
const logger = require("morgan")

const app = express()

app.use(logger("dev"))
app.use(express.json())

// Configure both serve-favicon & static middleware
app.use(favicon(path.join(__dirname, "build", "favicon.ico")))
app.use(express.static(path.join(__dirname, "build")))

const port = process.env.PORT || 3001

app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.listen(port, function () {
	console.log(`Express app running on port ${port}`)
})
