const express = require("express")
const User = require("./models/users")
const Location = require("./models/locations")
var config = require('./config');
const { MIN_HOUR, MAX_HOUR } = require("./config");

const router = express.Router()

// Obtener todos los usuarios
router.get("/users/list", async (req, res) => {
    const users = await User.find({}).sort('-_id') //En orden inverso
    res.send(users)
})

//Agregar un nuevo usuario
router.post("/users/add", async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    //Comprobar si el usuario ya está registrado
    let user = await User.findOne({ email: email })
    if (user) {
        res.send({ error: "Error: El usuario ya está registrado" })
    }

    else {
        user = new User({
            name: name,
            email: email,
        })
        await user.save()
        res.send(user)
    }
})

//Borrar usuario por email
router.get("/users/delete/:email", async (req, res) => {
    //Comprobar si el usuario está registrado
    let user = await User.findOne({ email: req.params.email })
    console.log(user);
    if (!user)
        res.send({ error: "Error: El usuario no está registrado" })
    else {
        let user = await User.deleteOne({ email: req.params.email })
        res.send(user)
    }
})

//Borrar location
//Tener en cuenta que una location está vinculada a user
router.delete("/locations/delete/:_id", async (req, res) => {
    //Comprobar si la location está registrada
    let idLocation = req.params._id;
    console.log("Voy a borrar: " + idLocation)
    let result = await Location.deleteOne({ _id: idLocation });

    if(result && result.deletedCount > 0){
        criterio = {
            locations: { $in: [idLocation] } 
        }
        
        let user = await User.findOne( criterio ) //En orden inverso
        if (!user) {
            res.send({ error: "Error: El usuario no existe" })
            return;
        }
        let writeResult = await User.update(
            { '_id': user._id },
            { $pull: { locations: idLocation } })
       
            if(writeResult.nModified != 1){
                res.send({ error: "Error: El usuario no ha sido modificado" })
            return;
            }
        res.send(result);
    } else {
        res.send({ error: "Error: La localización no ha sido borrada" })
    }

        
})

// Obtener todas las localizaciones
router.get("/locations/list", async (req, res) => {
    const positions = await Location.find({}).sort('-_id') //En orden inverso
    res.send(positions)
})

//Agregar una nueva localización
//Es obligatorio añadir una localización con una longitud, latitud, fecha y email de un usuario.
router.post("/locations/add", async (req, res) => {
    let longitud = req.body.longitud;
    let latitud = req.body.latitud;
    let fecha = req.body.fecha;
    let email = req.body.email;
    console.log("Creando una localización (" + longitud + "," + latitud + ")" + " y fecha: " + fecha + " para " + email);
    
    let user = await User.find({ email }) //En orden inverso
    if (!user) {
        res.send({ error: "Error: El usuario no existe" })
        return;
    }
    if (user[0].locations) {

        console.log("Núm locations=" + user[0].locations.length);
        if (user[0].locations.length >= config.MAX_LOCATIONS) {

            let idlocBorrar = user[0].locations[0];
            console.log("Borrar location " + idlocBorrar);
            await Location.deleteOne({ _id: idlocBorrar })
            await User.update(
                { '_id': user[0]._id },
                { $pull: { locations: idlocBorrar } })
        }
    }


    let location = new Location({
        longitud: longitud,
        latitud: latitud,
        fecha: fecha,
    })

    await location.save()

    //Registrar la localización para el usuario
    //Usuario y localización tienen una relación Many to One
    await User.update(
        { '_id': user[0]._id },
        { $push: { locations: location._id } })


    res.send(location)


})

//Agregar una nueva localización
//Es obligatorio añadir una localización con una longitud, latitud, fecha y email de un usuario.
router.post("/locations/addbyid", async (req, res) => {
    let longitud = req.body.longitud;
    let latitud = req.body.latitud;
    let fecha = new Date();
    let id = req.body.id;
    console.log("Creando una localización (" + longitud + "," + latitud + ")" + " y fecha: " + fecha + " para " + id);
    let user = await User.find({ _id: id })
    if (!user) {
        res.send({ error: "Error: El usuario no existe" })
        return;
    }
    if (user[0].locations) {
        console.log("Núm locations=" + user[0].locations.length);
        if (user[0].locations.length >= config.MAX_LOCATIONS) {

            let idlocBorrar = user[0].locations[0];
            console.log("Borrar location " + idlocBorrar);
            await Location.deleteOne({ _id: idlocBorrar })
            await User.updateOne(
                { '_id': user._id },
                { $pull: { locations: idlocBorrar } })
        }
    }
    let location = new Location({
        longitud: longitud,
        latitud: latitud,
        fecha: fecha,
    });
    await location.save();
    await User.updateOne(
        { '_id': id },
        { $push: { locations: location._id } }
    );
    res.send(location)
})

// Obtener las localizaciones para un usuario (email) y una fecha opcional
router.get("/locations/:email/:fecha?", async (req, res) => {
    console.log("Emisor: ", req.params.email);
    let criterio = { email: req.params.email };

    let user = await User.find(criterio).sort('-_id') //En orden inverso

    let locs = user[0].locations;

    let fecha = req.params.fecha;

    if (fecha != undefined) {

        criterio = {
            $and: [{ '_id': { $in: locs } }, { fecha: {
                                                $gt: fecha + MIN_HOUR,
                                                $lt: fecha + MAX_HOUR
                                            } 
        }]
        }, function (err, locs) {
            console.log(locs);
        }
    } else {
        criterio = {
            '_id': { $in: locs }
        }, function (err, locs) {
            console.log(locs);
        }
    }

    locs = await Location.find(criterio);

    res.send(locs);
})

// Obtener todos los usuarios que se encuentran en
//una latitud y una longitud dentro de un radio
//También con en una fecha que se encuentre entre una
//fecha mínima y máxima.
router.get("/users/:latitud/:longitud/:radio/:fechaMin/:fechaMax", async (req, res) => {
    let lat1 = req.params.latitud - req.params.radio;
    console.log(lat1);
    let lat2 = parseInt(req.params.latitud) + parseInt(req.params.radio);
    console.log(lat2);
    let long1 = req.params.longitud - req.params.radio;
    let long2 = parseInt(req.params.longitud) + parseInt(req.params.radio);
    let fechaMin = new Date(req.params.fechaMin);
    let fechaMax = new Date(req.params.fechaMax);
    console.log(fechaMin);
    console.log(fechaMax);
    let criterio = {
        latitud: {
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

    let locations_ids = await Location.find(criterio).select('_id') //En orden inverso
    console.log("locations_ids:" + locations_ids)
    let locs = []
    locations_ids.forEach(element => {
        locs.push(element._id)
        console.log(element._id)
    })

    criterio = { locations: { $in: locs } }
    let users = await User.find(criterio).sort('-_id') //En orden inverso
    res.send(users);
})

//Agregar un nuevo amigo
router.post("/users/friends/add/:email1/:email2", async (req, res) => {
    console.log("Emisor: ", req.params.email1);
    console.log("Receptor: ", req.params.email2);
    let email1 = req.params.email1;
    let email2 = req.params.email2;

    let emisor = await User.findOne({ email: email1 })
    if (!emisor) {
        res.send({ error: "Error: El emisor no existe" })
    }

    let receptor = await User.findOne({ email: email2 })
    if (!receptor) {
        res.send({ error: "Error: El emisor no existe" })
    }

    let user = await User.find(emisor).sort('-_id') //En orden inverso

    let friends = user[0].friends;

    //Registrar un amigo (receptor) para el usuario (emisor)
    await User.findByIdAndUpdate(emisor._id,
        { $push: { friends: receptor._id } }, { new: true, userfindAndModify: false })

    res.send(emisor);
})

//Obtener los amigos de un usuario
router.get("/users/friends/list/:email1", async (req, res) => {
    console.log("Emisor: ", req.params.email1);
    let email1 = req.params.email1;

    let emisor = await User.findOne({ email: email1 })
    if (!emisor) {
        res.send({ error: "Error: El emisor no existe" })
    }

    let user = await User.find(emisor).sort('-_id') //En orden inverso

    let friends = user[0].friends;

    friends.forEach(x => console.log(x))

    let criterio = { '_id': { $in: friends } }

    friends = await User.find(criterio);

    res.send(friends);
})

module.exports = router