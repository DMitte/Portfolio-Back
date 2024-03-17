const mongoose = require('mongoose')
const dbConnect = (err) =>{
    mongoose.set("strictQuery", false);
    mongoose.connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.0btfapw.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
      
    )
    if(!err){
      console.log("*** BD Conectada 👍 ***")
    }else{
      console.log("*** Error al conectarse a la BD ⛔***")
    }
}

module.exports = {dbConnect};