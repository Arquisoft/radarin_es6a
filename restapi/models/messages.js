const mongoose = require("mongoose")

const schemaLocation = mongoose.Schema({
    emisor: String,
    receptor: String,
    mensaje:String,
    fecha: Date,
})

module.exports = mongoose.model("Message", schemaLocation)
