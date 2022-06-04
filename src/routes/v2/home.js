///
/// This files contains the backend APIs regarding functions that allow to add a new home to the user account
///

const express = require("express")
const Home = require("../../models/Home")
const router = express.Router()

//Route that, upon verifying that correct parameters have been sent, adds a new Home document to the database
//Returns some status json for frontend purposes
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


    const host = req.User.user.username;
    const tags = req.body.tags.trim().split(',');


    try{
        const home = new Home({
            address: req.body.address,
            city: req.body.city,
            beds: req.body.beds,
            start: req.body.start,
            end: req.body.end,
            host: host,
            image: req.body.image,
            tags: tags
        })
        await home.save()
        res.status(200)

        res.json({
            success: true,
            message: "Alloggio aggiunto!"
        })

    }
    catch (error) {
        console.log(error.message)
        res.status(400)

        res.json({
            success: false,
            message: "Alloggio già esistente"
        })

    }
})


router.get("/listaPrenotazioni", async (req, res) => {
    const alloggio = await Home.findById(req.query.id)
    res.status(200).send(alloggio)
})



module.exports = router
