const express = require("express")
const Home = require("../models/Home")
const router = express.Router()

// TODO: Add host verification via JWT tokens
router.post("/", async (req, res) => {
    // Checking parameters
    if (! req.body.address) {
        res.status(400)
        res.send("Indirizzo mancante")
        return
    }

    if (! req.body.host) {
        res.status(400)
        res.send("Host mancante")
        return
    }

    if (! req.body.image) {
        res.status(400)
        res.send("Immagine mancante")
        return
    }

    if (! req.body.tags) {
        res.status(400)
        res.send("Tag mancanti")
        return
    }

    try{
        const home = new Home({
            address: req.body.address,
            host: req.body.host,
            image: req.body.image,
            tags: req.body.tags
        })
        await home.save()
        res.status(200)
        res.send("Alloggio aggiunto")
    }
    catch{
        res.status(400)
        res.send("Alloggio già esistente")
    }
})

module.exports = router
