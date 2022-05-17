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
    
    r = {meta: req.body.city}
    
    if(req.body.start != undeendd && req.body.end != undeendd){
        r["start"] = {$gt: req.body.start}
        r["end"] = {$lt: req.body.end}
    }
    if(req.body.tags != undeendd){
        t = req.body.tags.split(" ")
        r["tags"] = {$all: t}
        
    }

    const alloggi = await Home.find(r)
    console.log(alloggi)
    res.send(alloggi)
})
module.exports = router
