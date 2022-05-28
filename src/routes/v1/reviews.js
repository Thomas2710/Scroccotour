///
/// This files contains the backend APIs regarding the login and register functionalities
///

const express = require("express")
const User = require("../models/User") 
const Tour = require("../models/Tour") 
const Home = require("../models/Home")
const router = express.Router()
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

router.post('/addHostReview', async (req, res) => {
    
    if (! req.body.home){
        res.status(404);
        res.json({success: false, message: 'Parametro città mancante'});
    }
    if (! req.body.host){ 
        res.status(404);
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
router.post('/addGuestReview', async (req, res) => {
    if (! req.body.guest){ 
        res.status(404);
        res.json({success: false, message: 'username guest mancante'});
    }
    console.log(req.body)
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
    console.log(guest)
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

router.post('/getHomeReviews', async (req, res) => {
    var home = await Home.findById(req.body.id)
    console.log(home)
    var list = []
    var host = await User.findOne({username: home.host})
    console.log(host)
    
    host.recensioni_come_host.forEach(rev => {
        if(rev.home == req.body.id){
            console.log(rev)
            list.push(rev)
        }
    })
    res.send(list)
})

router.get('/getHostToReview',async(req,res)=>{
    var tour = await Tour.find({owner: req.User.user.username, completated: 1, booked: 1})
    var alloggi = []
    
    tour.forEach( t => {
        t.homes.forEach(a => {
            alloggi.push(a)
        })
        
        
        })
    var list = []
    for(i=0;i<alloggi.length;i++){
        var h = await Home.findById(alloggi[i])
        list.push(h.host)
        
    }
    const l = new Set(list)
    const json = JSON.stringify(Array.from(l))
    res.send(json)
})

module.exports = router


