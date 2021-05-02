const mongoose = require("mongoose")
const Location = require("./locations")

const schemaUser = mongoose.Schema({
    idp: String,
    webID: String,
    email: String,
    admin: Boolean,
    locations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "schemaLocation"
        }
    ]
})

module.exports = mongoose.model("User", schemaUser)