const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const {dbConnect} = require('./config/dbConnection')

//configuration cors
var corsOptions = {
    origin: 'https://danymitte.vercel.app',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

// capture body
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
//imports middlewares
const uploadMiddleware = require('./app/middleware/uploadImages')


//imports routes
const projects = require('./app/routes/projects')
app.use('/api/portfolio/projects',  uploadMiddleware, projects)

app.get('/',  (req, res) => {
    res.send('Vale esta monda')
})

dbConnect();
let Port =  process.env.PORT || 8000
app.listen(Port, () => {
    console.log(`Server running port: ${Port}`)
})