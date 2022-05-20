const express = require("express")
const Tour = require("../models/Tour") // new
const router = express.Router()
const jwt = require('jsonwebtoken'); 

const saveTour = async (updatedTour, shouldBook) => {
    const tourToUpdate = await Tour.findById(updatedTour._id);

    tourToUpdate.cities = updatedTour.cities;
    tourToUpdate.homes = updatedTour.homes;

    if (shouldBook) {
        tourToUpdate.booked = 1;
    }

    const savedTour = await tourToUpdate.save();
    return savedTour;
}

const updateTour = async (cityId, tourId, city ) => {
    const tourToUpdate = await Tour.findById(tourId);

    if(tourToUpdate != null){
    tourToUpdate.homes.push(cityId);
    tourToUpdate.cities.push(city);
    

    const savedTour = await tourToUpdate.save();
    return savedTour;
    }
    else{
        return null
    }
}

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
	res.json(u);
	
	}
	catch (error){
        console.log(error)
		res.status(400)
		res.json({ success: false, message: 'Errore nella creazione del tour' });
	}
    
})

router.post('/save', async (req, res) => {
    if (! req.body.tour) {
        res.status(404);
        res.json({success: false, message: 'Parametro tour mancante'});
    }

    const updatedTour = JSON.parse(req.body.tour);
    const newTour = await saveTour(updatedTour, false);

    res.send(newTour)
})

router.post('/book', async (req, res) => {
    if (! req.body.tour) {
        res.status(404);
        res.json({success: false, message: 'Parametro tour mancante'});
    }
 
    const updatedTour = JSON.parse(req.body.tour);
    const newTour = await saveTour(updatedTour, true);

    res.send(newTour)
})

router.post('/addCity', async (req, res) => {
    if (! req.body.tourId) {
        res.status(404);
        res.json({success: false, message: 'Parametro tour mancante'});
    }
    if (! req.body.cityId) {
        res.status(404);
        res.json({success: false, message: 'Parametro alloggio mancante'});
    }
    if (! req.body.start) {
        res.status(404);
        res.json({success: false, message: 'Parametro startDate mancante'});
    }
    if (! req.body.end) {
        res.status(404);
        res.json({success: false, message: 'Parametro endDate mancante'});
    }
    if (! req.body.end) {
        res.status(404);
        res.json({success: false, message: 'Parametro città mancante'});
    }
    console.log(req.body)
    const newTour = await updateTour(req.body.id,);
    res.status(200);
    res.send(newTour);
})

router.get("/getTour", async (req, res) => {
    const tour = await Tour.findById( req.query.id);
    res.send(tour);
})

module.exports = router