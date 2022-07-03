'use strict';

const fs = require('fs');
const User = require('../core/user.js');

// create an object from the class User in the file core/user.js
const user = new User();

const output = {
   login: (req, res, next) => {
      let user = req.session.user;
      // If there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
      if(user) {
         res.redirect('/home');
         return;
      }
      // IF not we just send the index page.
      res.render('login.ejs');
   },

   register: (req, res, next) => {
      let user = req.session.user;
      if(user) {
         res.redirect('/home');
         return;
      }
      res.render('register.ejs');
   },

   home: (req, res, next) => {
      let user = req.session.user;
      if(user) {
         fs.readdir('./gallery/family', (err, files) => {
            res.render('home.ejs', {fileName: files, directory:'family'});
         });
         return;
      }
      res.redirect('/');
   },

   dad: (req, res, next) => {
      let user = req.session.user;
      if(user) {
         fs.readdir('./gallery/dad', (err, files) => {
            res.render('home.ejs', {fileName: files, directory:'dad'});
         });
         return;
      }
      res.redirect('/');
   },

   mom: (req, res, next) => {
      let user = req.session.user;
      if(user) {
         fs.readdir('./gallery/mom', (err, files) => {
            res.render('home.ejs', {fileName: files, directory:'mom'});
         });
         return;
      }
      res.redirect('/');
   },

   brother: (req, res, next) => {
      let user = req.session.user;
      if(user) {
         fs.readdir('./gallery/brother', (err, files) => {
            res.render('home.ejs', {fileName: files, directory:'brother'});
         });
         return;
      }
      res.redirect('/');
   },

   sister: (req, res, next) => {
      let user = req.session.user;
      if(user) {
         fs.readdir('./gallery/sister', (err, files) => {
            res.render('home.ejs', {fileName: files, directory:'sister'});
         });
         return;
      }
      res.redirect('/');
   },

   oyee: (req, res, next) => {
      let user = req.session.user;
      if(user) {
         fs.readdir('./gallery/oyee', (err, files) => {
            res.render('home.ejs', {fileName: files, directory:'oyee'});
         });
         return;
      }
      res.redirect('/');
   },

   logout: (req, res, next) => {
      // Check if the session is exist
      if(req.session.user) {
         // destroy the session and redirect the user to the index page.
         req.session.destroy(function() {
            res.redirect('/');
         });
      }
   },

};

const process = {
   login: (req, res, next) => {
      // The data sent from the user are stored in the req.body object.
      // call our login function and it will return the result(the user data).
      user.login(req.body.username, req.body.password, function(result) {
         if(result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            res.redirect('/home');
         }else {
            // if the login function returns null send this error message back to the user.
            res.send('Username/Password incorrect!');
         }
      })   
   },

   register: (req, res, next) => {
      // prepare an object containing all user inputs.
      let userInput = {
         username: req.body.username,
         fullname: req.body.fullname,
         password: req.body.password
      };
      // call create function. to create a new user. if there is no error this function will return it's id.
      user.register(userInput, function(lastId) {
         // if the creation of the user goes well we should get an integer (id of the inserted user)
         if(lastId) {
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
                  req.session.user = result;
                  req.session.opp = 0;
                  res.redirect('/home');
            });
   
         }else {
            console.log('Error registering a new user ...');
         }
      });
   },

};

module.exports = {
   output,
   process,
};
