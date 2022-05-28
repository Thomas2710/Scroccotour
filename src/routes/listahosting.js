///
/// This files contains the backend APIs regarding functions that allow to perform queryies to retrieve Home documents
///

const express = require("express")
const Home = require("../models/Home") // new
const router = express.Router()
const jwt = require('jsonwebtoken'); 

//Route that retrieves all the homes that belongs to the logged user.
//Returns the retrieved documents
router.get("/myalloggi", async (req, res) => {
    const alloggi = await Home.find({ host: req.User.user.username })
    res.send(alloggi)
})
//Function that retrieves a specific home given its id
//Returns the retrieved document
router.get("/dettaglio", async (req, res) => {
    const alloggio = await Home.findById( req.query.id);
    res.send(alloggio);
})

//Function that retrieves all the homes in a specific city. 
//If tags or/and date of start/end of availability of the home is given in the body they are also accounted for the query 
//Returns the retrieved documents
router.post("/alloggi", async (req, res) => {
    r = {city: req.body.city}
    console.log(req.body.tags)
    if(req.body.start != undefined && req.body.end != undefined){
        console.log(start)
        console.log(end)
        var start = Number(req.body.start)
        var end = Number(req.body.end)
        r["start"] = {$lte: start}
        r["end"] = {$gte: end}
    }

    if(req.body.tags != undefined){
        console.log(req.body.tags)
        t = req.body.tags
        r["tags"] = {$all: t}
    }
    //console.log(r);
    const alloggi = await Home.find(r)
    //console.log(alloggi)
    res.send(alloggi)
})
module.exports = router
