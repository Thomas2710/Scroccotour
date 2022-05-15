const express = require("express")
const Home = require("../models/Home") // new
const router = express.Router()
const jwt = require('jsonwebtoken'); 

router.get("/myalloggi", async (req, res) => {
    
    const alloggi = await Home.find({ host: req.User.username })
    console.log(alloggi)
    res.send(alloggi)
})

router.post("/alloggi", async (req, res) => {
    
    r = {meta: req.body.meta}
    
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