const request = require('supertest'); 
const express = require('express');
const app = require('../index.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require("../models/User")
describe('Test /api/v1/auth/login', () => {
    beforeAll( async () => { jest.setTimeout(10000);
        app.locals.db = await mongoose.connect(process.env.MONGODB_URI); });
    afterAll( () => { mongoose.connection.close(true); });
    test('POST /api/v1/auth/login with correct credentials', () => {
        var credentials = {
            username: process.env.TESTS_USERNAME,
            password: process.env.TESTS_PASSWORD
        }
        return request(app).post('/api/v1/auth/login')
            .send(credentials)
            .expect(200);
    });
    test('POST /api/v1/auth/login with incorrect username', () => {
        var credentials = {
            username: "wrong_username",
            password: process.env.TESTS_PASSWORD
        }
        return request(app).post('/api/v1/auth/login')
            .send(credentials)
            .expect(400,{ success: false, message: 'Autenticazione fallita' });
    });
    test('POST /api/v1/auth/login with incorrect password', () => {
        var credentials = {
            username: process.env.TESTS_USERNAME,
            password: "wrong_credentials"
        }
        return request(app).post('/api/v1/auth/login')
            .send(credentials)
            .expect(400,{ success: false, message: 'Autenticazione fallita' });
    });
})

describe('Test /api/v1/auth/register', () => {

    
    test('POST /api/v1/auth/register with already present username', () => {
        var credentials = {
            username: process.env.TESTS_USERNAME,
            password: process.env.TESTS_PASSWORD,
            email: "not present email"
        }
        return request(app).post('/api/v1/auth/register')
            .send(credentials)
            .expect(400,{ success: false, message: 'Registratione fallita' });
    });
    /*test('POST /api/v1/auth/register with already present email', () => {
        var credentials = {
            username: "not present username",
            password: process.env.TESTS_PASSWORD,
            email: process.env.TESTS_EMAIL
        }
        return request(app).post('/api/v1/auth/register')
            .send(credentials)
            .expect(400,{ success: false, message: 'Registratione fallita' });
    });*/
})


