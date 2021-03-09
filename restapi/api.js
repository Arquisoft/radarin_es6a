const express = require("express")
const User = require("./models/users")
const Location = require("./models/locations")

const router = express.Router()

// Get all users
router.get("/users/list", async (req, res) => {
    const users = await User.find({}).sort('-_id') //Inverse order
	res.send(users)
})

//Register a new user
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
	res.send(positions)
})

//Register a new location
//It is compulsory to assing a location for a user by his/her email
router.post("/locations/add", async (req, res) => {
    let longitud = req.body.longitud;
    let latitud = req.body.latitud;
    let fecha = req.body.fecha;
    let email = req.body.email;
    console.log("Creando una location (" + longitud + "," + latitud + ")" + " y fecha: " + fecha + " para " + email);
    //Check if the location is already in the db
    let location = await Location.findOne({ longitud: longitud,
                                         latitud: latitud,
                                         fecha: fecha,
                                        email: email})
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
    
    let locs = user[0].locations;
        
    locs = await Location.find({
        '_id': { $in: locs}
    }, function(err, locs){
         console.log(locs);
    });

    res.send(locs);
})

// Get all users in a 
router.get("/users/:latitud/:longitud/:radio/:fecha/:rangoSeconds", async (req, res) => {
    let lat1 = req.params.latitud - req.params.radio;
    let lat2 = parseInt(req.params.latitud) + parseInt(req.params.radio);
    let long1 = req.params.longitud - req.params.radio;
    let long2 = parseInt(req.params.longitud) + parseInt(req.params.radio);
    let fechaMin = new Date(req.params.fecha);
    let fechaMax = new Date(req.params.fecha);
    fechaMin.setHours(fechaMin.getHours() - 1 )//req.params.rangoSeconds);
    console.log("fechaMin hours: " + fechaMin.getHours());
    fechaMax.setHours(fechaMax.getHours() + parseInt(1));
    console.log("fechaMax hours: " + fechaMax.getHours());
    let criterio = {   latitud: {
                            $gt: lat1,
                            $lt: lat2
                        },  
                        longitud: {
                            $gt: long1,
                            $lt: long2
                        },
                        fecha: {
                            $gt: fechaMin,
                            $lt: fechaMax
                        }
                    }
    
    let locations_ids = await Location.find(criterio).select('_id') //Inverse order
    console.log("locations_ids:" + locations_ids)
    let locs = []
    locations_ids.forEach(element => {
        locs.push(element._id)
        console.log(element._id)   
    }
    )
    
    criterio = {locations : { $in: locs} }
    let users = await User.find(criterio).sort('-_id') //Inverse order
	res.send(users);
})

// Get all locations for a given email and date
router.get("/locations/:email/:fecha", async (req, res) => {
    let criterioUsuario = {email : req.params.email};
    
    let user = await User.find(criterioUsuario).sort('-_id') //Inverse order
    
    //locations for the user
    let locs = user[0].locations;
    
    console.log(locs);

    let criterioFecha = {fecha: req.params.fecha};
    
    let location = await Location.find(criterioFecha).sort('-_id') //Inverse order

    locs.forEach(element => {
        if(element == location)
            res.send(element)
    });

    const position = await Location.findById(locs).sort('-_id') //Inverse order

    res.send(position);
})

module.exports = router