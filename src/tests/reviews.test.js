const request = require('supertest'); 
const express = require('express');
const app = require('../index.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require("../models/User")

test('Test /api/v1/reviews/ without token', () => {
    return request(app).get('/api/v1/reviews/')
        .expect(500)
});



describe('Test /api/v1/reviews/getGuestToReview', () => {
    
    test('GET /api/v1/reviews/getGuestToReview', async () => {
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
        return request(app).get('/api/v1/reviews/getGuestToReview')
            .set('Authorization', 'Bearer ' + token)
            .expect(200);
    });

})
describe('Test /api/v1/reviews/getHostToReview', () => {
    
    test('GET /api/v1/reviews/getHostToReview', async () => {
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
        return request(app).get('/api/v1/reviews/getHostToReview')
            .set('Authorization', 'Bearer ' + token)
            .expect(200);
    });

})
describe('Test /api/v1/reviews/getreviewsashost', () => {
    
    test('POST /api/v1/reviews/getreviewsashost', async () => {
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
        return request(app).get('/api/v1/reviews/getreviewsashost')
            .set('Authorization', 'Bearer ' + token)
            .expect(200);
    });

})
describe('Test /api/v1/reviews/getreviewsasguest', () => {
    
    test('POST /api/v1/reviews/getreviewsasguest', async () => {
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
        return request(app).get('/api/v1/reviews/getreviewsasguest')
            .set('Authorization', 'Bearer ' + token)
            .expect(200);
    });

})

describe('Test /api/v1/reviews/getHomeReviews', () => {
    
    test('GET /api/v1/reviews/getHomeReviews with home id', async () => {
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
        var id = "628ba0a38ac754889c4aec10"
        return request(app).post('/api/v1/reviews/getHomeReviews')
            .send({id:id})
            .set('Authorization', 'Bearer ' + token)
            .expect(200);
    });

    test('GET /api/v1/reviews/getHomeReviews without home id', async () => {
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
        return request(app).post('/api/v1/reviews/getHomeReviews')
            .set('Authorization', 'Bearer ' + token)
            .expect(400);
    });
})

