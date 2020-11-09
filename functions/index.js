const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { request, response } = require('express');
import {stripeKey} from './stripe';

// Stripe
const stripe = require('stripe')(stripeKey);

// API

// App Config
const app = express();

// Middlewares
app.use(cors({
                origin:true
            })
        );
app.use(
            express.json()
        );

// API Routes
app.get('/', (request, response) => response.status(200).send('Status Code : OK'));
app.get('/Arie', (request, response) => response.status(200).send('Status Code : OK Arie'));

app.post('/payments/create', async (request, response) => {
    // request query
    const total = request.query.total;
    console.log('Payment Request Recieve >>> ', total);//Debuging total

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunit of the currency
        currency: "usd",
    });

    // console.log('Payment Intent is >>>',paymentIntent.client_secret);//Debuging stripe
    
    // OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
})

// Listen Command
exports.api = functions.https.onRequest(app);

// Firebase Emulator Endpoint
// http://localhost:5001/clone-5c7be/us-central1/api