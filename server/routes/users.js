var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");


router.post('/register',
  body("username").isLength({ min: 3 }).trim().escape(),
  body("email").isLength({ min: 3 }).trim().escape(),
  body("password").isStrongPassword(),
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
        return res.status(403).json({ username: "Username already in use." });
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
                //return res.redirect("/users/login");
              }
            );
          });
        });
      }
    });

  });

router.post('/login',
  (req, res, next) => {
    console.log(req.body);
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.status(403).json({ message: "No user with this username" });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            const jwtPayload = {
              id: user._id,
              username: user.username
            }
            console.log(process.env.SECRET);
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