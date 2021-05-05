const express = require("express")
const User = require("./models/users")
const Location = require("./models/locations")
const Message = require("./models/messages")
var config = require('./config');
const { MIN_HOUR, MAX_HOUR } = require("./config");
const router = express.Router();
const SolidNodeClient = require("solid-node-client").SolidNodeClient;
const client = new SolidNodeClient();
var auth = require('solid-auth-cli');
const $rdf = require("rdflib");
const FOAF = $rdf.Namespace("http://xmlns.com/foaf/0.1/");
const VCARD = $rdf.Namespace("http://www.w3.org/2006/vcard/ns#");

router.post("/user/login", async (req, res) => {
    let idp = req.body.idp;
    let user = req.body.user;
    let password = req.body.password;
    let session = await logIn(idp, user, password);
    if (session == null) {
        res.send({
            result: false
        });
    } else {
        let name = await getName(session.webId);
        let photo = await getPhoto(session.webId);

        let friends = await findFriendsFor(session.webId);

        let usuario = await User.findOne({
            email: user,
            idp: idp
        });
        if (!usuario) {
            console.log("No hay usuario para este pod, creando usuario...");
            let usuario = new User({
                email: user,
                idp: idp,
                webID: user + "." + (idp.replace("https://", ""))
            });
            await usuario.save();
            console.log("Usuario creado.");
        }
        let usuario2 = await User.findOne({
            email: user,
            idp: idp
        });
        auth.logout();
        res.send({
            result: true,
            userid: usuario2._id,
            friends: friends,
            name: name,
            photo: photo
        });
    }
});

async function logIn(idp, user, password) {
    console.log("Intentando iniciar sesión como: '" + user + "' de " + idp);
    try {
        let session = await auth.login({
            idp: idp,
            username: user,
            password: password
        });
        console.log("Inicio de sesión correcto.");
        return session;
    } catch (error) {
        console.log("No se ha podido iniciar sesión.");
        return null;
    }
}

async function getName(webId) {
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);
    const me = store.sym(webId);
    const profile = me.doc();
    await fetcher.load(profile);
    const name = store.any(me, FOAF("name"));
    console.log("**** NOMBRE: " + (name != null ? name.value : null));
    return name != null ? name.value : null;
}

async function getPhoto(webId) {
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);
    const me = store.sym(webId);
    const profile = me.doc();
    await fetcher.load(profile);
    const photo = store.any(me, VCARD("hasPhoto"));
    console.log("**** FOTO: " + (photo != null ? photo.value : null));
    return photo != null ? photo.value : null;
}

async function findFriendsFor(webId) {
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);
    const me = store.sym(webId);
    const profile = me.doc();
    await fetcher.load(profile);
    let friends = store.each(me, FOAF("knows"));
    let amigos = [];
    friends.forEach(e => amigos.push(e.value));
    console.log("**** AMIGOS: " + amigos.length);
    return amigos;
}

// Get all users
router.get("/users/list", async (req, res) => {
    const users = await User.find({}).sort('-_id') //Inverse order
    res.send(users)
})

//register a new user
router.post("/users/add", async (req, res) => {
    let idp = "https://" + req.body.idp;
    let email = req.body.email;
    let webID = req.body.email + "." + req.body.idp;
    let admin = req.body.admin | false;
    //Check if the device is already in the db
    let user = await User.findOne({ webID: webID })
    console.log(webID)
    if (user)
        res.send({ error: "Error: This user is already registered" })
    else {
        user = new User({
            email: email,
            webID: webID,
            admin: admin
        })
        await user.save()
        res.send(user)
    }
})

async function saveUser(webID) {
    let usuario = new User({
        email: webID.replace(".inrupt.net", "").replace(".solidcommunity.net", ""),
        idp: webID.includes(".inrupt.net") ? "https://inrupt.net" : "https://solidcommunity.net",
        webID: webID
    });
    await usuario.save();
    console.log("Usuario creado: " + webID);
}

//Borrar usuario por id
router.delete("/users/delete/:_id", async (req, res) => {
    //Comprobar si el usuario está registrado
    let idUser = req.params._id;
    console.log("Voy a borrar: " + idUser)
    let result = await User.deleteOne({ _id: idUser });
    if (result && result.deletedCount > 0) {
        res.send(result);
    } else {
        res.send({ error: "Error: La localización no ha sido borrada" })
    }    
});

//Borrar location
//Tener en cuenta que una location está vinculada a user
router.delete("/locations/delete/:_id", async (req, res) => {
    //Comprobar si la location está registrada
    let idLocation = req.params._id;
    console.log("Voy a borrar: " + idLocation)
    let result = await Location.deleteOne({ _id: idLocation });

    if (result && result.deletedCount > 0) {
        criterio = {
            locations: { $in: [idLocation] }
        }

        let user = await User.findOne(criterio) //En orden inverso
        if (!user) {
            res.send({ error: "Error: El usuario no existe" })
            return;
        }
        let writeResult = await User.update(
            { '_id': user._id },
            { $pull: { locations: idLocation } })

        if (writeResult.nModified != 1) {
            res.send({ error: "Error: El usuario no ha sido modificado" })
            return;
        }
        res.send(result);
    } else {
        res.send({ error: "Error: La localización no ha sido borrada" })
    }
});

// Obtener todas las localizaciones
router.get("/locations/list", async (req, res) => {
    const positions = await Location.find({}).sort('-_id') //En orden inverso
    res.send(positions)
})

//Agregar una nueva localización
//Es obligatorio añadir una localización con una longitud, latitud, fecha e id de un usuario.
router.post("/locations/add", async (req, res) => {
    let longitud = req.body.longitud;
    let latitud = req.body.latitud;
    let fecha = new Date();
    let id = req.body.id;
    let friends = req.body.friends;
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
            await User.updateOne(
                { '_id': user[0]._id },
                { $pull: { locations: idlocBorrar } });
            await Location.deleteOne({ _id: idlocBorrar });
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
    let count = 0;
    let list = [];
    for (var i = 0; i < friends.length; i++) {
        var obj = friends[i];
        let u = await User.findOne({
            email: obj.username,
            idp: obj.idp
        });
        if (!u)
            continue;
        let ls = u.locations;
        if (ls.length == 0)
            continue;
        let l = await Location.find({ _id: ls[ls.length - 1] });
        let dis = distance(latitud, longitud, l[0].latitud, l[0].longitud);
        if (dis <= 1) {
            count = count + 1;
            list.push({
                username: u.email,
                idp: u.idp,
                _id: u._id
            });
        }
    }
    console.log("Amigos cercanos: " + count);
    let response = {
        number: count,
        friends: list
    }
    res.send(response);
})

function distance(lat1, lon1, lat2, lon2) {
    lat1 = parseFloat(lat1);
    lon1 = parseFloat(lon1);
    lat2 = parseFloat(lat2);
    lon2 = parseFloat(lon2);
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        return dist;
    }
}

// Obtener las localizaciones para un usuario (webID) y una fecha opcional
// Ejemplo de webID: uo234567.inrupt.net
router.get("/locations/:webID/:fecha?", async (req, res) => {
    let webID = req.params.webID;
    console.log("Emisor: ", webID);
    let criterio = { webID: webID };

    let user = await User.find(criterio).sort('-_id')
    if (user.length > 0) {
        let locs = user[0].locations;
        let fecha = req.params.fecha;
        if (fecha != undefined) {
            criterio = {
                $and: [{ '_id': { $in: locs } }, {
                    fecha: {
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
    } else {
        saveUser(webID);
        res.send({});
    }
});

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

//Enviar mensaje
router.post("/chat/send", async (req, res) => {
    let email1 = req.body.email1;
    let email2 = req.body.email2;
    let message = req.body.mensaje;
    console.log("Mensaje de chat: " + message);
    var m = new Message({
        emisor: email1,
        receptor: email2,
        mensaje: message
    })
    await m.save()
    res.send(m)
})

//Obtener los mensajes de un chat
router.post("/chat/list", async (req, res) => {
    let email1 = req.body.email1;
    let email2 = req.body.email2;
    let criterio = { $or: [{ 'emisor': email1, 'receptor': email2 }, { 'emisor': email2, 'receptor': email1 }] };
    messages = await Message.find(criterio);
    res.send(messages);

})

//Obtener los amigos cercanos y su localización
router.get("/friends/near/:webId/:longitud/:latitud", async (req, res) => {
    let usuario = "https://" + req.params.webId + "/profile/card#me";
    let longitud = req.params.longitud;
    console.log(usuario);
    let latitud = req.params.latitud;
    let friends = await findFriendsFor(usuario);
    let count = 0;
    let list = [];
    console.log(friends);
    for (var i = 0; i < friends.length; i++) {
        var obj = friends[i];

        let idepe = obj.includes(".inrupt.net") ? "https://inrupt.net" : "https://solidcommunity.net";
        let nombre = obj.includes(".inrupt.net") ? obj.substr(8, obj.length - 20) : obj.substr(8, obj.length - 27);
        let u = await User.findOne({
            email: nombre,
            idp: idepe
        });

        if (!u) {
            continue;
        }
        let ls = u.locations;

        if (ls.length == 0) {
            continue;
        }
        let l = await Location.find({ _id: ls[ls.length - 1] });
        let dis = distance(latitud, longitud, l[0].latitud, l[0].longitud);

        if (dis <= 1) {
            count = count + 1;
            list.push({
                username: u.email,
                idp: u.idp,
                _id: u._id,
                longitud: l[0].longitud,
                latitud: l[0].latitud
            });
        }
    }
    console.log("Amigos cercanos: " + count);
    let response = {
        number: count,
        friends: list
    }
    res.send(response);
})

module.exports = router