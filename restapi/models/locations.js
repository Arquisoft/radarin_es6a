const mongoose = require("mongoose")

const schemaLocation = mongoose.Schema({
    longitud: Number,
    latitud: Number,
    fecha: Date,
})

module.exports = mongoose.model("Location", schemaLocation)
