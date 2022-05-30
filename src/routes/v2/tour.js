///
/// This file contain the filter applyied to every API route that requires to be logged in
///

const express = require("express")
const Tour = require("../../models/Tour")
const User = require("../../models/User") // new
const router = express.Router()
const jwt = require('jsonwebtoken'); 
const { update } = require("../../models/Tour");
const Home = require("../../models/Home");
const { query } = require("express");


//Function that saves unfinished Tours and/or book the entire Tour. Returns the updated Tour object
const saveTour = async (updatedTour, shouldBook, guestId) => {
    const tourToUpdate = await Tour.findById(updatedTour._id);

    tourToUpdate.cities = updatedTour.cities;
    tourToUpdate.homes = updatedTour.homes;
    tourToUpdate.dates = updatedTour.dates;

    if (shouldBook) {
        tourToUpdate.booked = 1;

        for (let i = 0; i < tourToUpdate.homes.length; i++) {
            const home = await Home.findById(tourToUpdate.homes[i]);

            home.bookings.push({
                guest: guestId,
                start: updatedTour.dates[i].start,
                end: updatedTour.dates[i].end,
            })

            await home.save();
        }
    }

    const savedTour = await tourToUpdate.save();
    console.log(savedTour);
    return savedTour;
}

//Funzione che aggiunge a un tour nel DB un alloggio
const updateTour = async (tourId, cityId, city, start, end, nights ) => {
    const tourToUpdate = await Tour.findById(tourId);

    tourToUpdate.homes.push(cityId);
    tourToUpdate.cities.push(city);
    tourToUpdate.dates.push({start: start, end: end});
    tourToUpdate.nights_remaining -= nights/(60*60*24*1000);

    const savedTour = await tourToUpdate.save();
    return savedTour;
}

//Route that starts the creation of a Tour.
//Depending on the "selection" parameter, the Tour is initially created with different parameters.
//Returns the newly created tour object
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
            dates: [],
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
        
        let dates = [];
        for (let i = 0; i < randomtour.cities.length; i++) {
            dates.push({
                guest: "",
                start: 0,
                end: 0
            })
        }

        json = {
            name: "Tour",
            owner: req.User.user.username,
            start: start,
            end: end,
            people: req.body.people,
            cities: randomtour.cities,
            homes: randomtour.cities,
            dates: dates,
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
//Route that starts the saving process of a Tour. Return the updated Tour object.
//Returns the Tour object
router.post('/save', async (req, res) => {
    if (! req.body.tour) {
        res.status(404);
        res.json({success: false, message: 'Parametro tour mancante'});
    }

    const updatedTour = JSON.parse(req.body.tour);
    const newTour = await saveTour(updatedTour, false, "");

    res.send(newTour)
})
//Route that booking the saving process of a tour.
//Returns the updated Tour object
router.post('/book', async (req, res) => {
    if (! req.body.tour) {
        res.status(404);
        res.json({success: false, message: 'Parametro tour mancante'});
    }

    const guest = req.User.user.username;
 
    const updatedTour = JSON.parse(req.body.tour);
    const newTour = await saveTour(updatedTour, true, guest);

    res.send(newTour)
})
//Route that copies a tour and resets its homes.
//Returns the tour object
router.post('/copy', async (req, res) => {
    if (! req.body.tourId) {
        res.status(404);
        res.json({success: false, message: 'Parametro tourId mancante'});
    }

    const targetTour = await Tour.findById(tourId);

    let dates = [];
    for (let i = 0; i < randomtour.cities.length; i++) {
        dates.push({
            guest: "",
            start: 0,
            end: 0
        })
    }

    const newTour = await Tour({
        name: "Tour",
        owner: req.User.user.username,
        start: req.body.start,
        end: req.body.end,
        people: req.body.people,
        cities: targetTour.cities,
        homes: targetTour.cities, // Not a bug, this way homes are just placeholders
        dates: dates,
        likes: 0,
        completed: 0,
        booked: 0,
        nights_remaining: (req.body.end - req.body.start)/(60*60*24)
    })


    res.send(newTour)
})
//Route that modifies a tour
//Returns the tour object
router.post('/edit', async (req, res) => {
    if (! req.body.tourId) {
        res.status(404);
        res.json({success: false, message: 'Parametro tourId mancante'});
    }

    const tour = await Tour.findById(tourId);

    // Apply changes
    if (req.body.name) {
        tour.name = req.body.name;
    }

    if (req.body.city && req.body.home) {
        for (let i = 0; i < tour.cities.length; i++) {
            if (tour.cities[i] == req.body.city) {
                tour.cities[i] = req.body.home;
            }
        }
    }

    // Save the tour
    const updatedTour = await tour.save();

    res.send(updatedTour)
})
//Route that updates the Tour document when a new city is added
//Returns the updated Tour object
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
    if (! req.body.city) {
        res.status(404);
        res.json({success: false, message: 'Parametro città mancante'});
    }
    const newTour = await updateTour(req.body.tourId, req.body.cityId, req.body.city, req.body.start, req.body.end, req.body.nights);
    res.status(200);
    res.send(newTour);
})
//Route that allow to retrieve a Tour document given its id
//Returns the Tour object
router.get("/getTour", async (req, res) => {
    const tour = await Tour.findById( req.query.id);
    res.send(tour);
})


router.get("/searchTour", async (req, res) => {
    const tours = await Tour.find({name: req.query.name, completed: 1});
    res.send(tours);
})

//Aggiunge un like di un utente a un tour
router.post("/like", async (req, res) =>{
    const user = req.User.user.username;
    const utente = await User.findOne({username : user});
    if(utente.tour_preferiti.includes(req.body.id)){
        res.status(400);
        res.json({success: false, message: "Tour già messo nei preferiti"})
    }
    else{
        utente.tour_preferiti.push(req.body.id);
        const utenteUpdated = await utente.save();
        const tour = await Tour.findById(req.body.id);
        tour.likes +=1;
        const updatedTour = await tour.save();
        res.status(200);
        res.json({success: true});
    }
})

//Toglie un like di un utente da un tour
router.post("/dislike", async (req, res) =>{
    const user = req.User.user.username;
    const utente = await User.findOne({username : user});
    if(utente.tour_preferiti.includes(req.body.id)){
        //Rimuovo l'item dall'array dei preferiti
        utente.tour_preferiti.splice(utente.tour_preferiti.indexOf(req.body.id),1);
        const utenteUpdated = await utente.save();
        const tour = await Tour.findById(req.body.id);
        tour.likes -=1;
        const updatedTour = await tour.save();
        res.status(200);
        res.json({success: true});
    }
    else{
        res.status(400);
        res.json({success: false, message: "Il tour non era nei preferiti"});
    }
})

//Controllo se un tour è nei preferiti dell'utente
router.get("/isFavourite", async (req, res) => {
    const user = req.User.user.username;
    const utente = await User.findOne({username : user});
    if(utente.tour_preferiti.includes(req.query.id)){
        res.json({favourite : true});
    }
    else{
        res.json({favourite : false});
    }
})


//Ritorna la lista dei tour in ordine crescente di likes
router.get("/topTour", async (req, res) => {
    const tours = await Tour.find({completed: 1});
    tours.sort((a,b) => {
        return b.likes - a.likes;
    });
    res.status(200);
    res.send(tours);

})

router.get("/myTours", async (req, res) => {
    const user = req.User.user.username;
    const myTours = await Tour.find({owner : user, booked : 1});
    res.status(200);
    res.send(myTours);
})

module.exports = router