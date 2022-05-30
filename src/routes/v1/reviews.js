///
/// This files contains the backend APIs regarding the review functionalities
///

const express = require("express")
const User = require("../../models/User") 
const Tour = require("../../models/Tour") 
const Home = require("../../models/Home")
const router = express.Router()
const jwt = require('jsonwebtoken'); 


//Route that allow the user to create a new review about an Host he was hosted by during a Tour
//If the core parameters are present (host username and city) the review is saved
router.post('/addHostReview', async (req, res) => {
    
    if (! req.body.home){
        res.status(400);
        res.json({success: false, message: 'Parametro città mancante'});
    }
    if (! req.body.host){ 
        res.status(400);
        res.json({success: false, message: 'username host mancante'});
    }
    let ordine, ospitalita, puntualità, generale, commento
    ordine = parseInt(req.body.ordine)
    ospitalita = parseInt(req.body.ospitalita)
    puntualita = parseInt(req.body.puntualita)
    generale = parseInt(req.body.generale)
    commento = req.body.commento
    if (! req.body.ordine){
        ordine = 1
    }
    if (! req.body.ospitalita){
        ospitalita = 1
    }
    if (! req.body.puntualità){
        puntualità = 1
    }
    if (! req.body.generale){
        generale = 1
    }
    if (! req.body.commento){
        commento = ""
    }
    var host = await User.findOne({username: req.body.host})

    var tmp = {
        da: req.User.user.username,
        home: req.body.home,
        ordine: ordine,
        ospitalita: ospitalita,
        puntualita: puntualita,
        generale: generale,
        commento: commento,
    }
    host.recensioni_come_host.push(tmp)


    if(host.recensioni_come_host.length == 1){
        host.voto_host = Math.floor((5 + generale)/2)
    }
    host.voto_host = ((host.voto_host* (host.recensioni_come_host.length-1)) + generale)/(host.recensioni_come_host.length)
    await host.save()
    res.send({success: true})

})
//Route that allow the user to create a new review about a Guest that was hosted by the user
//If the core parameter is present (host username ) the review is saved
router.post('/addGuestReview', async (req, res) => {
    if (! req.body.guest){ 
        res.status(400);
        res.json({success: false, message: 'username guest mancante'});
    }
    
    let pulizia, puntualità, generale, commento
    pulizia = parseInt(req.body.pulizia)
    puntualita = parseInt(req.body.puntualita)
    generale = parseInt(req.body.generale)
    commento = req.body.commento
    if (! req.body.pulizia){
        ordine = 1
    }
    if (! req.body.puntualità){
        puntualità = 1
    }
    if (! req.body.generale){
        generale = 1
    }
    if (! req.body.commento){
        commento = ""
    }
    var guest = await User.findOne({username: req.body.guest})
    guest.recensioni_come_guest.push({
        da: req.User.user.username,
        pulizia: pulizia,
        puntualita: puntualita,
        generale: generale,
        commento: commento,
    })
    if(guest.recensioni_come_guest.length == 1){
        guest.voto_guest = (5 + generale)/2
    }
    guest.voto_guest = ((guest.voto_guest* (guest.recensioni_come_guest.length-1)) + generale)/(guest.recensioni_come_guest.length)
    await guest.save()
    res.send({success: true})
})
//Route that query for the reviews of an host (given the Home id)
//Returns a list of reviews
router.post('/getHomeReviews', async (req, res) => {
    if(! req.body.id){
        res.status(400)
        res.json("Missing home id")
        return
    }
    var home = await Home.findById(req.body.id)
    var list = []
    var host = await User.findOne({username: home.host})
    host.recensioni_come_host.forEach(rev => {
        if(rev.home == home.city){
            list.push(rev)
        }
    })
    
    res.status(200)
    res.send(list)
})
//Route that query for the review of Host that the user can make
//Returns a list of pairs (host,city) to allow the user to create such reviews
router.get('/getHostToReview',async(req,res)=>{
    var tour = await Tour.find({owner: req.User.user.username, completed: 1, booked: 1})
    var alloggi = []
    
    tour.forEach( t => {
        t.homes.forEach(a => {
            alloggi.push(a)
        })
        })
    var list = []
    for(i=0;i<alloggi.length;i++){
        try{
        var h = await Home.findById(alloggi[i])
        var u = await User.findOne({username: h.host})
        var flag = 0
        for(j=0;j<u.recensioni_come_host.length;j++){
            if(u.recensioni_come_host[j].da == req.User.user.username){
                flag = 1
            }
        }
        if(flag==0)
            list.push({"host": h.host,"city":h.city})
        }
        catch{}
        
    }
    const l = new Set(list)
    const json = JSON.stringify(Array.from(l))
    res.status(200)
    res.send(json)
})
//Route that query for the review of Guests that the user can make
//Returns a list of Guests usernames to allow the user to create such reviews
router.get('/getGuestToReview',async(req,res)=>{
    var home = await Home.find({owner: req.User.user.username})
    var guests = []
    
    /*home.forEach( h => {
        if("bookings" in h){
            h.bookings.forEach(b => {
                if(b!=null && "guest" in b)
                    var u = await Home.find({owner: req.User.user.username})
                    guests.push(b.guest)
                }) 
            }  
    })*/

    for(var h of home){
        if("bookings" in h){
            for(var b of h.bookings){
                if(b!=null && "guest" in b){
                    var u = await User.findOne({username: b.guest})
                    var flag = 0
                    for(var k of u.recensioni_come_guest){
                        if(k.da == req.User.user.username){
                            flag = 1
                        }
                    }
                    if(flag==0){
                        guests.push(b.guest)
                    }
                }
            }
        }
    }
    const l = new Set(guests)
    const json = JSON.stringify(Array.from(l))
    res.send(json)
})
//Route that query for the reviews as host that the user received
//Returns a list of reviews
router.get('/getreviewsashost',async(req,res)=>{
    var u = await User.findById(req.User.id)
    res.json(u.recensioni_come_host)
})
//Route that query for the reviews as guest that the user received
//Returns a list of reviews
router.get('/getreviewsasguest',async(req,res)=>{
    var u = await User.findById(req.User.id)
    res.json(u.recensioni_come_guest)
})
module.exports = router


