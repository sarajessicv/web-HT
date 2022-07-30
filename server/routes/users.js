var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");


// endpoint to register user. Checking if the given username is free or not. If not used user is created
// also checking that user gives a strong password
// password is first hashed and saved to database as hashed
router.post('/register',
  body("username").isLength({ min: 3 }).trim().escape().withMessage("Username is not long enough"),
  body("email").isLength({ min: 3 }).trim().escape().withMessage("Invalid email address"),
  body("password").isStrongPassword().withMessage("Password must follow strong password rules"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        console.log(err);
        throw err
      };
      if (user) {
        return res.status(403).json({ errors: [{msg: "Username already in use."}] });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            User.create(
              {
                username: req.body.username,
                email: req.body.email,
                password: hash
              },
              (err, ok) => {
                if (err) throw err;
                return res.json({"success": true});
              }
            );
          });
        });
      }
    });

  });
// endpoint to check wheter user is authorized to log in with given username and password
router.post('/login',
  (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.status(403).json({ message: "No user with this username" });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (!isMatch){
            return res.status(403).json({ message: "Invalid credentials" });
          }
          if (isMatch) {
            const jwtPayload = {
              username: user.username
            }
            jwt.sign(
              jwtPayload,
              process.env.SECRET,
              
              (err, token) => {
                if(token){
                res.json({ "success": true, 'token': token})};
                res.json({"note": 'no token'});
              }
            );
          }
        })
      }

    })

  });

module.exports = router;