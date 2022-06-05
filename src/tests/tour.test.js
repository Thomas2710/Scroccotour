const request = require('supertest'); 
const express = require('express');
const app = require('../index.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require("../models/User");


describe('Test /api/v1/tour/getTour', () => {
    test('GET /api/v1/tour/getTour passing id', async () => {
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
        return request(app).get('/api/v1/tour/getTour')
            .query({id: process.env.TESTS_TOURID})
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    })

    test('GET /api/v1/tour/getTour without passing id', async () => {
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
        return request(app).get('/api/v1/tour/getTour')
            .set('Authorization', 'Bearer ' + token)
            .expect(400)
    })
  
})

describe('Test /api/v2/tour/getTour', () => {
    test('GET /api/v2/tour/getTour passing id', async () => {
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
        return request(app).get('/api/v2/tour/getTour')
            .query({id: process.env.TESTS_TOURID})
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    })

    test('GET /api/v2/tour/getTour without passing id', async () => {
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
        return request(app).get('/api/v2/tour/getTour')
            .set('Authorization', 'Bearer ' + token)
            .expect(400)
    })

    test('GET /api/v2/tour/getTour passing wrong id', async () => {
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
        return request(app).get('/api/v2/tour/getTour')
            .query({id: process.env.TESTS_WRONG_TOURID})
            .set('Authorization', 'Bearer ' + token)
            .expect(400)
    })
})

describe('Test /api/v2/tour/searchTour', () => {
    test('GET /api/v2/tour/searchTour passing name', async () => {
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
        return request(app).get('/api/v2/tour/searchTour')
            .query({name: process.env.TESTS_NAME})
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    })

    test('GET /api/v2/tour/getTour without passing name', async () => {
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
        return request(app).get('/api/v2/tour/searchTour')
            .set('Authorization', 'Bearer ' + token)
            .expect(400)
    })
})
/*
describe('Test /api/v2/tour/like', () => {
    test('GET /api/v2/tour/like passing an already liked tour', async () => {
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
        return request(app).get('/api/v2/tour/like')
            .query({id: process.env.TESTS_TOURID})
            .set('Authorization', 'Bearer ' + token)
            .expect(400)
    })
})
*/
describe('Test /api/v2/tour/isFavourite', () => {
    test('GET /api/v2/tour/isFavourite passing an already liked(favourite) tour', async () => {
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
        return request(app).get('/api/v2/tour/isFavourite')
            .query({id: process.env.TESTS_LIKED_TOUR})
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    })

    test('GET /api/v2/tour/isFavourite passing a non-liked tour', async () => {
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
        return request(app).get('/api/v2/tour/isFavourite')
            .query({id: process.env.TESTS_NON_LIKED_TOUR})
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    })
})

describe('Test /api/v2/tour/topTour', () => {
    test('GET /api/v2/tour/topTour', async () => {
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
        return request(app).get('/api/v2/tour/topTour')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    })
})

describe('Test /api/v2/tour/myTours', () => {
    test('GET /api/v2/tour/myTours', async () => {
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
        return request(app).get('/api/v2/tour/myTours')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    })
})
