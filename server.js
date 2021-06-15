const express = require('express')
var cors = require('cors')
const app = express()
const connectDB = require('./config/db')
const mailer = require('nodemailer')
const PORT = process.env.PORT || 3000


// Middleware
app.use(cors())
app.use(express.json())  //chamada BodyParser atualizada na versão 4 do node
app.use(express.urlencoded({ extended: true }));


// MongoDB 
connectDB()

//Rotas de cadastro 
app.use('/user', require('./routes/api/user'))

app.get('/', (req, res) => res.send('Server Hello'))



//Config mail Mailer
const config = {
    host: 'smtp.mailtrap.io',
    port: 25,
    auth: {
        user: 'c9a034133cad53',
        pass: '09fc4d2f820d58'
    }
}

// Rota de envio de email
const transporter = mailer.createTransport(config)
app.use(express.json())


app.post('/send-email', (req,res) => {

    const message = {
        from: 'f.montenegro.r@hotmail.com',
        to: 'felptijuk@hotmail.com', //colocar email sorteado
        subject: 'congratulations you were the winner!',
        text: 'congratulations you were the winner!!! Contact us!!'
    }

    transporter.sendMail(message, (error, info) => {
        if(error) {
            return res.status(400).send('sending email failed')
        }
        return res.status(200).send('email sent')

    })

})


app.listen(PORT, () => { 
    console.log(`port ${PORT}`)})