const express = require('express')
const bodyParser = require('body-parser')
const errorHandler = require('./utils/errorHandler');

const { PORT } = require('./config/server.config')
const apiRouter = require('./routes')
const connectToDB = require('./config/db.config');

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.text())
//-----api/v1/problem/-----------
app.use('/api', apiRouter)

app.get('/ping', (req,res) => {
    return res.json({message: 'server is alive '})
})


// last moddleware if any error comes
app.use(errorHandler)

app.listen(PORT, async () => {
    console.log(`Server running at PORT: ${PORT}`);
    await connectToDB();
    console.log("Successfully connected to db");
})
