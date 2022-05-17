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

    if (! req.body.city) {
        res.status(400)
        res.send("Città mancante")
        return
    }

    if (! req.body.beds) {
        res.status(400)
        res.send("Letti disponibili mancanti")
        return
    }

    if (! req.body.start) {
        res.status(400)
        res.send("Inizio disponibilità mancante")
        return
    }

    if (! req.body.end) {
        res.status(400)
        res.send("Fine disponibilità mancante")
        return
    }

    // if (! req.body.host) {
    //     res.status(400)
    //     res.send("Host mancante")
    //     return
    // }

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

    // TODO: Find host by JWT token
    let host = "thome"

    try{
        const home = new Home({
            address: req.body.address,
            city: req.body.city,
            beds: req.body.beds,
            start: req.body.start,
            end: req.body.end,
            host: host,
            image: req.body.image,
            tags: req.body.tags
        })
        await home.save()
        res.status(200)
        res.send("Alloggio aggiunto")
    }
    catch (error) {
        console.log(error.message)
        res.status(400)
        res.send("Alloggio già esistente")
    }
})

module.exports = router
