const request = require('supertest'); 
const express = require('express');
const app = require('../index.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require("../models/User")
const Home = require("../models/Home")


describe('Test /api/v1/home/', () => {
    //beforeAll( async () => { jest.setTimeout(8000);
        //app.locals.db = await mongoose.connect(process.env.MONGODB_URI); });
    //afterAll( () => { mongoose.connection.close(true); });
    
    
    /*var home = {
        address: "Via Sommarive, 2",
        city: "Povo",
        beds: "2",
        start: "1",
        end: "2000000000000",
        host: process.env.TESTS_USERNAME,
        image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.unitn.it%2Fsites%2Fwww.unitn.it%2Fthemes%2Funitn_theme%2Fimages%2Flogo_unirento_www.png&imgrefurl=https%3A%2F%2Fwww.unitn.it%2F&tbnid=PpFpGZcAAtjDUM&vet=12ahUKEwiW_K_5_oT4AhUSYxoKHeNLCbgQMygBegUIARC3AQ..i&docid=kQrw_Y9nqRlGiM&w=340&h=340&q=Unitn&ved=2ahUKEwiW_K_5_oT4AhUSYxoKHeNLCbgQMygBegUIARC3AQ",
        tags: ["Università","Collina","Multipiano"]
    }*/
    test('POST /api/v1/home/ with missing address parameter', async () => {
        var user = await User.findOne({ username: process.env.TESTS_USERNAME})
        var payload = {
            user: user,
            id: user._id,
            // other data encrypted in the token	
        }
        var options = {
            expiresIn: 86400 // expires in 24 hours
        }
        var token = jwt.sign(payload, process.env.JWT_KEY, options);
        var home = {
            city: "Povo",
            beds: 2,
            start: 1,
            end: 2000000000000,
            host: process.env.TESTS_USERNAME,
            image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.unitn.it%2Fsites%2Fwww.unitn.it%2Fthemes%2Funitn_theme%2Fimages%2Flogo_unirento_www.png&imgrefurl=https%3A%2F%2Fwww.unitn.it%2F&tbnid=PpFpGZcAAtjDUM&vet=12ahUKEwiW_K_5_oT4AhUSYxoKHeNLCbgQMygBegUIARC3AQ..i&docid=kQrw_Y9nqRlGiM&w=340&h=340&q=Unitn&ved=2ahUKEwiW_K_5_oT4AhUSYxoKHeNLCbgQMygBegUIARC3AQ",
            tags: ["Università","Collina","Multipiano"]
        }
        return request(app).post('/api/v1/home/')
            .set('Authorization', 'Bearer ' + token)
            .send(home)
            .expect(400);
    });
    test('POST /api/v1/home/ with missing city parameter', async () => {
        var user = await User.findOne({ username: process.env.TESTS_USERNAME})
        var payload = {
            user: user,
            id: user._id,
            // other data encrypted in the token	
        }
        var options = {
            expiresIn: 86400 // expires in 24 hours
        }
        var token = jwt.sign(payload, process.env.JWT_KEY, options);
        var home = {
            address: "Via Sommarive, 2",
            beds: 2,
            start: 1,
            end: 2000000000000,
            host: process.env.TESTS_USERNAME,
            image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.unitn.it%2Fsites%2Fwww.unitn.it%2Fthemes%2Funitn_theme%2Fimages%2Flogo_unirento_www.png&imgrefurl=https%3A%2F%2Fwww.unitn.it%2F&tbnid=PpFpGZcAAtjDUM&vet=12ahUKEwiW_K_5_oT4AhUSYxoKHeNLCbgQMygBegUIARC3AQ..i&docid=kQrw_Y9nqRlGiM&w=340&h=340&q=Unitn&ved=2ahUKEwiW_K_5_oT4AhUSYxoKHeNLCbgQMygBegUIARC3AQ",
            tags: ["Università","Collina","Multipiano"]
        }
        return request(app).post('/api/v1/home/')
            .set('Authorization', 'Bearer ' + token)
            .send(home)
            .expect(400);
    });
    test('POST /api/v1/home/ with missing beds parameter', async () => {
        var user = await User.findOne({ username: process.env.TESTS_USERNAME})
        var payload = {
            user: user,
            id: user._id,
            // other data encrypted in the token	
        }
        var options = {
            expiresIn: 86400 // expires in 24 hours
        }
        var token = jwt.sign(payload, process.env.JWT_KEY, options);
        var home = {
            address: "Via Sommarive, 2",
            city: "Povo",
            start: 1,
            end: 2000000000000,
            host: process.env.TESTS_USERNAME,
            image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.unitn.it%2Fsites%2Fwww.unitn.it%2Fthemes%2Funitn_theme%2Fimages%2Flogo_unirento_www.png&imgrefurl=https%3A%2F%2Fwww.unitn.it%2F&tbnid=PpFpGZcAAtjDUM&vet=12ahUKEwiW_K_5_oT4AhUSYxoKHeNLCbgQMygBegUIARC3AQ..i&docid=kQrw_Y9nqRlGiM&w=340&h=340&q=Unitn&ved=2ahUKEwiW_K_5_oT4AhUSYxoKHeNLCbgQMygBegUIARC3AQ",
            tags: ["Università","Collina","Multipiano"]
        }
        return request(app).post('/api/v1/home/')
            .set('Authorization', 'Bearer ' + token)
            .send(home)
            .expect(400);
    });
    test('POST /api/v1/home/ with missing start parameter', async () => {
        var user = await User.findOne({ username: process.env.TESTS_USERNAME})
        var payload = {
            user: user,
            id: user._id,
            // other data encrypted in the token	
        }
        var options = {
            expiresIn: 86400 // expires in 24 hours
        }
        var token = jwt.sign(payload, process.env.JWT_KEY, options);
        var home = {
            address: "Via Sommarive, 2",
            city: "Povo",
            beds: 2,
            end: 2000000000000,
            host: process.env.TESTS_USERNAME,
            image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.unitn.it%2Fsites%2Fwww.unitn.it%2Fthemes%2Funitn_theme%2Fimages%2Flogo_unirento_www.png&imgrefurl=https%3A%2F%2Fwww.unitn.it%2F&tbnid=PpFpGZcAAtjDUM&vet=12ahUKEwiW_K_5_oT4AhUSYxoKHeNLCbgQMygBegUIARC3AQ..i&docid=kQrw_Y9nqRlGiM&w=340&h=340&q=Unitn&ved=2ahUKEwiW_K_5_oT4AhUSYxoKHeNLCbgQMygBegUIARC3AQ",
            tags: ["Università","Collina","Multipiano"]
        }
        return request(app).post('/api/v1/home/')
            .set('Authorization', 'Bearer ' + token)
            .send(home)
            .expect(400);
    });
    test('POST /api/v1/home/ with missing end parameter', async () => {
        var user = await User.findOne({ username: process.env.TESTS_USERNAME})
        var payload = {
            user: user,
            id: user._id,
            // other data encrypted in the token	
        }
        var options = {
            expiresIn: 86400 // expires in 24 hours
        }
        var token = jwt.sign(payload, process.env.JWT_KEY, options);
        var home = {
            address: "Via Sommarive, 2",
            city: "Povo",
            beds: 2,
            start: 1,
            host: process.env.TESTS_USERNAME,
            image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.unitn.it%2Fsites%2Fwww.unitn.it%2Fthemes%2Funitn_theme%2Fimages%2Flogo_unirento_www.png&imgrefurl=https%3A%2F%2Fwww.unitn.it%2F&tbnid=PpFpGZcAAtjDUM&vet=12ahUKEwiW_K_5_oT4AhUSYxoKHeNLCbgQMygBegUIARC3AQ..i&docid=kQrw_Y9nqRlGiM&w=340&h=340&q=Unitn&ved=2ahUKEwiW_K_5_oT4AhUSYxoKHeNLCbgQMygBegUIARC3AQ",
            tags: ["Università","Collina","Multipiano"]
        }
        return request(app).post('/api/v1/home/')
            .set('Authorization', 'Bearer ' + token)
            .send(home)
            .expect(400);
    });
    test('POST /api/v1/home/ with missing image parameter', async () => {
        var user = await User.findOne({ username: process.env.TESTS_USERNAME})
        var payload = {
            user: user,
            id: user._id,
            // other data encrypted in the token	
        }
        var options = {
            expiresIn: 86400 // expires in 24 hours
        }
        var token = jwt.sign(payload, process.env.JWT_KEY, options);
        var home = {
            address: "Via Sommarive, 2",
            city: "Povo",
            beds: 2,
            start: 1,
            end: 2000000000000, 
            host: process.env.TESTS_USERNAME,
            tags: ["Università","Collina","Multipiano"]
        }
        return request(app).post('/api/v1/home/')
            .set('Authorization', 'Bearer ' + token)
            .send(home)
            .expect(400);
    });
    test('POST /api/v1/home/ with missing tags parameter', async () => {
        var user = await User.findOne({ username: process.env.TESTS_USERNAME})
        var payload = {
            user: user,
            id: user._id,
            // other data encrypted in the token	
        }
        var options = {
            expiresIn: 86400 // expires in 24 hours
        }
        var token = jwt.sign(payload, process.env.JWT_KEY, options);
        var home = {
            address: "Via Sommarive, 2",
            city: "Povo",
            beds: 2,
            start: 1,
            end: 2000000000000, 
            host: process.env.TESTS_USERNAME,
            image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.unitn.it%2Fsites%2Fwww.unitn.it%2Fthemes%2Funitn_theme%2Fimages%2Flogo_unirento_www.png&imgrefurl=https%3A%2F%2Fwww.unitn.it%2F&tbnid=PpFpGZcAAtjDUM&vet=12ahUKEwiW_K_5_oT4AhUSYxoKHeNLCbgQMygBegUIARC3AQ..i&docid=kQrw_Y9nqRlGiM&w=340&h=340&q=Unitn&ved=2ahUKEwiW_K_5_oT4AhUSYxoKHeNLCbgQMygBegUIARC3AQ",
        }
        return request(app).post('/api/v1/home/')
            .set('Authorization', 'Bearer ' + token)
            .send(home)
            .expect(400);
    });
    test('POST /api/v1/home/ without token', async () => {
        
        var home = {
            address: "Via Sommarive, 2",
            city: "Povo",
            beds: 2,
            start: 1,
            end: 2000000000000, 
            host: process.env.TESTS_USERNAME,
            image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.unitn.it%2Fsites%2Fwww.unitn.it%2Fthemes%2Funitn_theme%2Fimages%2Flogo_unirento_www.png&imgrefurl=https%3A%2F%2Fwww.unitn.it%2F&tbnid=PpFpGZcAAtjDUM&vet=12ahUKEwiW_K_5_oT4AhUSYxoKHeNLCbgQMygBegUIARC3AQ..i&docid=kQrw_Y9nqRlGiM&w=340&h=340&q=Unitn&ved=2ahUKEwiW_K_5_oT4AhUSYxoKHeNLCbgQMygBegUIARC3AQ",
            tags: ["Università","Collina","Multipiano"]
        }
        return request(app).post('/api/v1/home/')
            .send(home)
            .expect(500);
    });
})

describe('Test /api/v2/home/listaPrenotazioni', () => {

    test('GET /api/v2/home/listaPrenotazioni passing id', async () => {
        var user = await User.findOne({ username: process.env.TESTS_USERNAME})
        var payload = {
            user: user,
            id: user._id,
            // other data encrypted in the token	
        }
        var options = {
            expiresIn: 86400 // expires in 24 hours
        }
        var token = jwt.sign(payload, process.env.JWT_KEY, options);
        return request(app).get('/api/v2/home/listaPrenotazioni')
            .query({id: process.env.TESTS_ALLOGGIO})
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    })

    test('GET /api/v2/home/listaPrenotazioni not passing id', async () => {
        var user = await User.findOne({ username: process.env.TESTS_USERNAME})
        var payload = {
            user: user,
            id: user._id,
            // other data encrypted in the token	
        }
        var options = {
            expiresIn: 86400 // expires in 24 hours
        }
        var token = jwt.sign(payload, process.env.JWT_KEY, options);
        return request(app).get('/api/v2/home/listaPrenotazioni')
            .set('Authorization', 'Bearer ' + token)
            .expect(400)
    })
})


