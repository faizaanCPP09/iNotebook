const connectToMongo = require('./db');
const express = require('express')
const app = express()
const port = 5000
var cors = require('cors') //Express cors middleware

// app.get('/', (req, res) => {
//   res.send('Hello Faizaan!')
// })

app.use(cors())
app.use(express.json())    //Middleware function, when we use 'req.body'
//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/note', require('./routes/note'))


app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
connectToMongo();