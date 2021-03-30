const express = require("express")
const promBundle = require("express-prom-bundle");
const cors = require('cors');
const mongoose = require("mongoose")
const api = require("./api")
const MAX_LOCATIONS = 5

function connect() {
    //The MONGO_URI variable is the connection string to MongoDB Atlas (for production). This env variable is created in heroku.
    mongo_uri = process.env.MONGO_URI || "mongodb://localhost:27017"
    mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        const app = express()

        //Monitoring middleware
        const metricsMiddleware = promBundle({ includeMethod: true });
        app.use(metricsMiddleware);

        app.use(cors());
        app.options('*', cors());
        app.use(express.json());
        app.use("/api", api);


        app.listen(process.env.PORT || 5000, () => {
            console.log("Server has started! Using db in " + mongo_uri)
        })

        //Descomentar el siguiente código para borrar la collección pasada
        /*mongoose.connection.collections['users'].drop( function(err) {
            console.log('collection dropped');
        });*/
    })
}

// Connect to MongoDB database, the wait is for giving time to mongodb to finish loading
setTimeout(connect, 5000)