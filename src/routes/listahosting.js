const express = require("express")
const Home = require("../models/Home") // new
const router = express.Router()
const jwt = require('jsonwebtoken'); 

router.get("/myalloggi", async (req, res) => {
    const alloggi = await Home.find({ host: req.User.user.username })
    res.send(alloggi)
})

router.get("/dettaglio", async (req, res) => {
    const alloggio = await Home.findById( req.query.id);
    res.send(alloggio);
})

router.post("/alloggi", async (req, res) => {
    r = {city: req.body.city}
    console.log(req.body.tags)
    if(req.body.start != undefined && req.body.end != undefined){
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
