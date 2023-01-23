const express = require('express')
const app = express()
// const server = require('http')
require('dotenv').config()
// require('express-async-errors')

const connectDB = require('./src/db/conect')

const AuthRouter = require('./src/routes/Auth')


app.use(express.static('../public/app.html'))
app.use(express.json())

app.use('/api/v1/home', AuthRouter)

const port = process.env.PORT || 3000
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, function(){
            console.log('Server is listening on port 3000...');
        })
    } catch (error) {
        console.log(error);
    }
}
start()