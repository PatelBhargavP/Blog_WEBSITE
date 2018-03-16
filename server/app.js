var express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose');

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }

app.use(cors(corsOptions));
app.use(bodyParser.json());
var mongodb_obj = "";

app.post('/createuser', function (req, res) {
    console.log("createuser api called");
    console.log(req.body,"Body payload");
    var user_1 = new User(req.body);
    User.find({ "username": user_1.username }, function (err, data) {
        console.log(data);
        if (data=="") {
            console.log("username checked");
            user_1.save(function (err) {
                if (!err) {
                    console.log("user saved");
                    res.json({registered:true});
                } else {
                    
                }
            });
        }else{
            res.json({success:false});
        }
    });
});

app.post('/loginuser', function (req, res) {
    console.log("loginuser api called");
    console.log(req.body,"Body payload");
    var user_1 = new User(req.body);
    console.log(user_1,"User_1")
    User.find({ "username": user_1.username }, function (err, data) {
        console.log(data[0].password);
        if (data[0].password==user_1.password) {
            console.log("username checked");
            // var current = data[0]
            var token = jwt.sign({'uname':req .body.username}, 'marlabs-secret-key', {
                expiresIn: '1h'
              });
              res.send({"loggedIn":true, 'token':token, "thisUser":user_1.username});
             
        }else{
            res.send({"loggedIn":false});
        }
    });
});

app.use(function(req, res, next) {
    // console.log(req);
    var token = req.headers.authorization;
    console.log("after saving",token);
    if(token) {
      jwt.verify(token, 'marlabs-secret-key', function (err, decoded) {
        if (err) {
          console.log('Error');
        } else {
            req.decoded = decoded;
            console.log(req.decoded);
            next();
        }
      });
    } else { 
    }
  });

app.post('/createPost', function (req, res) {
    console.log("createPost api called");
    console.log(req.body,"Body payload");
    var post_1 = new Post(req.body);
    post_1.save(function (err) {
        console.log(err,"this is error")
        if (!err) {
            console.log("user saved");
            res.json({posted:true});
        } else {
            res.json({posted:false});
        }
    });    
});

app.get('/getpost', function(req, res) {
    console.log("get post called");
    Post.find({}, function (err, data) {
        if (!err) {
            res.send(data)
            // console.log(data);
        } else {
            console.log('Error connecting to database')
        }
    })
});

app.post('/addLike', function (req, res) {
    console.log("addLike api called");
    console.log(req.body,"Body payload");
    var like = req.body;
    console.log(like,"Saved locally")
    Post.findOneAndUpdate({"_id":like.postID},{$push: {"likes": {likedBy: req.body.user}}},function(err,data){
        // console.log(data.likes,"Searched post");
        Post.find({"_id":like.postID}, function (err, data) {
            if (!err) {
                res.send(data)
                // console.log(data);
            } else {
                console.log('Error connecting to database')
            }
        }) 
    });
          
});

app.post('/removeLike', function (req, res) {
    console.log("removeLike api called");
    console.log(req.body,"Body payload");
    var like = req.body;
    console.log(like,"Saved locally")
    Post.findOneAndUpdate({"_id":like.postID},{$pull: {"likes": {likedBy: req.body.user}}}, function(err,data){
        // console.log(data,"Searched post")
        Post.find({"_id":like.postID}, function (err, data) {
            if (!err) {
                res.send(data)
                // console.log(data);
            } else {
                console.log('Error connecting to database')
            }
        })  
        // res.send(data)  
    });
   
});

app.post('/addComment', function (req, res) {
    console.log("addComment api called");
    console.log(req.body,"Body payload");
    var comment = req.body;
    console.log(comment,"Saved locally")
    Post.findOneAndUpdate({"_id":comment.id},{$push: {"comments": {commentBy: comment.user, text:comment.comment}}},function(err,data){
        // console.log(data.likes,"Searched post");
        Post.find({"_id":comment.id}, function (err, data) {
            if (!err) {
                res.send(data)
                // console.log("After adding to DB",data);
            } else {
                console.log('Error connecting to database')
            }
        }) 
    });
          
});

app.post('/viewCurrent', function (req, res) {
    console.log("viewCurrent api called");
    // console.log(req.body,"Body payload");
    Post.find({"_id":req.body._id}, function (err, data) {
        if (!err) {
            res.send(data)
            // console.log(data);
        } else {
            console.log('Error connecting to database')
        }
    })
});

mongoose.connect('mongodb://localhost/marlabs');
var db = mongoose.connection;
db.on('error', function () {
    console.log('connection error');
});
db.on('open', function () {
    console.log('connection established');
});

var UserSchema = mongoose.Schema({
    "username": {
        type: String,
        required: [true, "username can't be blank"]
    },
    "password": {
        type: String,
        required: [true, "password can't be blank"]
    },
    "fname": {
        type: String,
        required: [true, "fname can't be blank"]
    },
    "lname": {
        type: String,
        required: [true, "lname can't be blank"]
    },
    "location": {
        type: String,
        required: [true, "location can't be blank"]
    }
});

var PostSchema = mongoose.Schema({
    "postedBy": {
        type: String,
        required: [true, "username can't be blank"]
    },
    "title": {
        type: String,
        required: [true, "password can't be blank"]
    },
    "desc": {
        type: String,
        required: [true, "fname can't be blank"]
    },
    "likes": [{
        likedBy : String,
    }],
    "comments": [{
        text: String,
        commentBy: String
    }]
});

var User = mongoose.model('userAng', UserSchema);
var Post = mongoose.model("post", PostSchema);

// var user_1 = new User({
//     "username":"xyz",
//     "password":"ccc",
//     "fname":"ang",
//     "lname":"abc",
//     "location":"Piscataway"
// });

// user_1.save(function (err) {
//     if(err){
//         console.log("error saving data");
//     }else{
//         console.log("data saved successfully");
//     }
// })

// User.find({}, function (err, data) {
//     if (!err) {
//         console.log(data);
//     } else {
//         console.log('data not saved')
//     }
// })

// Post.find({}, function (err, data) {
//     if (!err) {
//         console.log(data);
//     } else {
//         console.log('posts not saved')
//     }
// })

app.listen(3000, function (err) {
    if (!err) {
        console.log('Server running @ 3000');
    } else {
        console.log('server running @ 3000')
    }
});