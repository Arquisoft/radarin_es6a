const express = require("express")
const User = require("./models/users")
const Location = require("./models/locations")

const router = express.Router()

// Get all users
router.get("/users/list", async (req, res) => {
    const users = await User.find({}).sort('-_id') //Inverse order
	res.send(users)
})

//register a new user
router.post("/users/add", async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    //Check if the device is already in the db
    let user = await User.findOne({ email: email })
    if (user)
        res.send({error:"Error: This user is already registered"})
    else{
        user = new User({
            name: name,
            email: email,
        })
        await user.save()
        res.send(user)
    }
})

// Get all locations
router.get("/locations/list", async (req, res) => {
    const positions = await Location.find({}).sort('-_id') //Inverse order
    positions.forEach(element => {
        console.log(element.name);
    });
	res.send(positions)
})

//register a new location
router.post("/locations/add", async (req, res) => {
    let longitud = req.body.longitud;
    let latitud = req.body.latitud;
    let fecha = req.body.fecha;
    let email = req.body.email;
    console.log("Creando una location (" + longitud + "," + latitud + ")" + " y fecha: " + fecha + " para " + email);
    //Check if the location is already in the db
    let location = await Location.findOne({ longitud: longitud,
                                         latitud: latitud,
                                         fecha: fecha })
    if (location)
        res.send({error:"Error: This location is already registered"})
    else{
        location = new Location({
            longitud: longitud,
            latitud: latitud,
            fecha: fecha,
        })
        await location.save()
        let user = await User.findOne({ email: email })
        if(!user) {
            res.send({error:"Error: User does not exists"})
        }
        await User.findByIdAndUpdate(user._id, 
            {$push: {locations : location._id}}, {new: true, userfindAndModify:false})
        res.send(location)
    }
})

// Get all locations for a given email
router.get("/locations/:email", async (req, res) => {
    console.log("Emisor: ", req.params.email);
    let criterio = {email : req.params.email};
    
    let user = await User.find(criterio).sort('-_id') //Inverse order
    
    console.log(user[0].locations);

    let locs = user[0].locations;

    const positions = await Location.findById(locs).sort('-_id') //Inverse order

    res.send(positions);

})


module.exports = router