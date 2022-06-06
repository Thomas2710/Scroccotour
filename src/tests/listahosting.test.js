const request = require('supertest'); 
const express = require('express');
const app = require('../index.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require("../models/User");
beforeAll( async () => { 
    app.locals.db = await mongoose.connect(process.env.MONGODB_URI); });
afterAll( async () => { await mongoose.connection.close(true);});
test('Test /api/v1/lista-hosting/ without token', () => {
    return request(app).get('/api/v1/lista-hosting/')
        .expect(500)
});

describe('Test /api/v1/lista-hosting/myalloggi', () => {
    
    test('GET /api/v1/lista-hosting/myalloggi with correct token', async () => {
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
        return request(app).get('/api/v1/lista-hosting/myalloggi')
            .set('Authorization', 'Bearer ' + token)
            .expect(200);
    });
})
describe('Test /api/v2/lista-hosting/alloggi', () => {
    
    test('GET /api/v2/lista-hosting/alloggi with all parameters', async () => {
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

        var alloggio = {
            city: "Povo",
            start: 1599688800001,
            end: 1661896799999,
            tags: ["università"]

        }
        return request(app).get('/api/v2/lista-hosting/alloggi')
            .set('Authorization', 'Bearer ' + token)
            .query(alloggio)
            .expect(200);
});
});


describe('Test /api/v1/lista-hosting/dettaglio', () => {
   
   
    test('GET /api/v1/lista-hosting/dettaglio with existing id', async () => {
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
        return request(app).get('/api/v1/lista-hosting/dettaglio')
            .query({id:'6282c788c62e801c83ba9707'})
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    }); 
    
})

