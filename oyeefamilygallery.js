'use strict';

const express = require('express');
const session = require('express-session');
const app = express();

const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const pageRouter = require('./routes/pages.js');

// for body parser. to collect data that sent from the client.
app.use(express.urlencoded( { extended : false} ));
// Serve static files. album photos
app.use(express.static(path.join(__dirname, './gallery')));
// Serve static files. CSS, Images, JS files ... etc
app.use(express.static(path.join(__dirname, './public')));

// Template engine. PUG
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// session
app.use(session({
   secret: 'ystory52.com',
   resave: false,
   saveUninitialized: false,
   cookie: {
      maxAge: 60 * 1000 * 30
   }
}));

// Routers
app.use('/', pageRouter);

// Errors => page not found 404
app.use((req, res, next) =>  {
   var err = new Error('Page not found');
   err.status = 404;
   next(err);
})

// Handling errors (send them to the client)
app.use((err, req, res, next) => {
   res.status(err.status || 500);
   res.send(err.message);
});

// Setting up the server
app.listen(process.env.PORT, () => {
   console.log(`Server is running on http://localhost:${process.env.PORT}...`);
});

module.exports = app;