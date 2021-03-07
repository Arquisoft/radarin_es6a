const mongoose = require("mongoose")
const Location = require("./locations")

const schemaUser = mongoose.Schema({
    name: String,
    email: String,
    locations : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "schemaLocation"
        }
    ]
})

module.exports = mongoose.model("User", schemaUser)