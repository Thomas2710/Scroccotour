const express = require("express")
const Home = require("../models/Home") // new
const router = express.Router()
const jwt = require('jsonwebtoken'); 

router.get("/myalloggi", async (req, res) => {
    const alloggi = await Home.find({ host: req.User.user.username })
    res.send(alloggi)
})
router.get("/dettaglio", async (req, res) => {
    
    const alloggio = await Home.find({ _id: req.body.id })
    res.send(alloggio)
})
router.post("/alloggi", async (req, res) => {
    
    r = {meta: req.body.city}
    
    if(req.body.inizio != undefined && req.body.fine != undefined){
        r["inizio"] = {$gt: req.body.inizio}
        r["fine"] = {$lt: req.body.fine}
    }
    if(req.body.tags != undefined){
        t = req.body.tags.split(" ")
        r["tags"] = {$all: t}
        
    }

    const alloggi = await Home.find(r)
    console.log(alloggi)
    res.send(alloggi)
})
module.exports = router
