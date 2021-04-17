const mongoose = require("mongoose")

const schemaLocation = mongoose.Schema({
    emisor: String,
    receptor: String,
    mensaje:String,

   
})

module.exports = mongoose.model("Message", schemaLocation)
