
var express = require('express');
var router = express.Router();
const Post = require("../models/Post");

router.post('/addNewPost',
    (req, res, next) => {
        Post.create(
            {
                username: req.body.username,
                title: req.body.title,
                post: req.body.post,
                comments: req.body.comments
            },
            (err, ok) => {
                if (err) throw err;
                return res.json({ "success": true });
            }
        );
    });


router.get('/getPosts', (req,res,next) => {
    Post.find({}, (error, posts) => {
        if (error) throw error;
        if (posts) {
            return res.json(posts);
        }
        else {
            console.log("Kumma virhe");
            return res.json({});
        }

    })
});

router.get('/getPost/:id', (req,res,next) => {
    Post.findOne({_id: req.params.id}, (error, post) => {
        if (error) throw error;
        if (post) {
            return res.json(post);
        }
        else {
            console.log("Kumma virhe");
            return res.json({});
        }

    })
});

router.post('/addComment/:id',
    (req, res, next) => {
        Post.findOne({_id: req.params.id}, (error, post) => {
            if (error) throw error;
            if (post) {
                (post.comments).push(req.body);
                post.save((err) => {
                    if(err) throw(err)
                    else res.json({success: true});
                  });
            }
            else {
                console.log("Kumma virhe");
                return res.json({});
            }
    
        })
    });


module.exports = router;
