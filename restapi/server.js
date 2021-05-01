const express = require("express")
const cors = require('cors');
const mongoose = require("mongoose")
const api = require("./api")
const MAX_LOCATIONS = 5

function connect(){
    //The MONGO_URI variable is the connection string to MongoDB Atlas (for production). This env variable is created in heroku.
   // mongo_uri = process.env.MONGO_URI || "mongodb://localhost:27017"
   mongo_uri = "mongodb+srv://mongouser:mongouser@cluster0.pcdsq.mongodb.net/radarin?retryWrites=true&w=majority"
    mongoose.connect(mongo_uri, { useNewUrlParser: true,useUnifiedTopology: true }).then(() => {
      
        console.log("MONGODB connected...")
      
         const app = express()

        app.use(cors());
        app.options('*', cors());
        app.use(express.json())
        app.use("/api", api)


        app.listen(process.env.PORT || 5000, () => {
            console.log("Server has started! Using db in "+mongo_uri)
        })

        //Descomentar el siguiente código para borrar la collección pasada en collectionsName
        /*mongoose.connection.collections['locations'].drop( function(err) {
            console.log('collection dropped');
        });*/
    }).catch(err => console.log(err));
   
}


// Connect to MongoDB database, the wait is for giving time to mongodb to finish loading
setTimeout(connect, 5000)