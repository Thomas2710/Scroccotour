const express = require("express")
const Tour = require("../models/Tour") // new
const router = express.Router()
const jwt = require('jsonwebtoken'); 

router.post("/newtour", async (req, res) => {
	try{
    var start =  Date.parse(req.body.start)/1000
    var end =  Date.parse(req.body.end)/1000
    var json = {}
    if(req.body.selection == "manuale"){
        json = {
            name: "Tour",
            owner: req.User.user.username,
            start: start,
            end: end,
            people: req.body.people,
            cities: [],
            homes: [],
            likes: 0,
            completed: 0,
            booked: 0,
            nights_remaining: (end-start)/(60*60*24)
        }
    }
    if(req.body.selection == "toptour"){
        //todo
    }
    if(req.body.selection == "randomtour"){
        const tour = await Tour.find({completed: 1});
        const randomtour = tour[Math.floor(Math.random() * tour.length)];
        
        json = {
            name: "Tour",
            owner: req.User.user.username,
            start: start,
            end: end,
            people: req.body.people,
            cities: randomtour.cities,
            homes: randomtour.cities,
            likes: 0,
            completed: 0,
            booked: 0,
            nights_remaining: (end-start)/(60*60*24)
        }


    }
    var u = new Tour(json)
    
	await u.save()
	res.status(200)
	res.json(json);
	
	}
	catch (error){
        console.log(error)
		res.status(400)
		res.json({ success: false, message: 'Errore nella creazione del tour' });
	}
    
})



router.get("/getTour", async (req, res) => {
    const tour = await Tour.findById( req.query.id);
    res.send(tour);
})
module.exports = router