const express = require('express')
var cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())  //chamada BodyParser atualizada na versão 4 do node
app.use(express.urlencoded({ extended: true }));




app.get('/', (req, res) => res.send('Server Hello'))

app.listen(PORT, () => { 
    console.log(`port ${PORT}`)})