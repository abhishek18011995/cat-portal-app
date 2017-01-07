var express = require('express');
var app = express();
var path = require("path");
var mongojs = require("mongojs");
var db = mongojs('catportal', ['user', 'trainerDetails', 'courseDetails', 'assessmentDetails']);
var bodyParser = require("body-parser");
var session = require('express-session');

app.set('trust proxy', 1) // trust first proxy
app.use(express.static(__dirname + "/public")); //making public folder static
app.use(bodyParser.json()); //returns middleware that only parses json
app.use(session({

    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

/**
 * getting post request from login-ctrl.js
 * for validating the userId and password
 */
app.post('/user', function(req, res, next) {

    var user = req.body;
    db.user.findOne({

        id: user.id,
        password: user.password
    }, function(err, docs) {

        if (err) {

            console.log("err");
            return next();
        } else if (!docs) {

            res.send("true");
        } else if (docs) {

            req.session.userId = docs.id;
            req.session.trainerId = docs.trainerId;
            req.session.batchCode = docs.batchCode;
            res.json(docs);
        }
    });
});

/**
 * respond with user details json
 * when a GET request is made
 * to the home-ctrl.js 
 */
app.get('/home/userDetails', function(req, res, next) {

    if (req.session.userId) {

        db.user.findOne({
            id: req.session.userId
        }, function(err, docs) {

            if (err) {

                console.log("err");
                return next();
            }

            if (docs) {

                res.json(docs);
            }
        });
    }
});

/**
 * respond with trainer details json
 * when a GET request is made
 * to the home-ctrl.js 
 */
app.get('/home/trainerDetails', function(req, res, next) {

    if (req.session.userId) {

        db.trainerDetails.findOne({
            trainerId: req.session.trainerId
        }, function(err, doc) {

            if (err) {

                console.log("err");
                return next();
            }

            if (doc) {

                res.json(doc);
            }
        });
    }
});

/**
 * respond with batch info json
 * when a GET request is made
 * to the batch-info-ctrl.js
 */
app.get('/home/batchInfo', function(req, res, next) {

    if (req.session.userId) {

        db.user.find({
            batchCode: req.session.batchCode
        }, function(err, doc) {

            if (err) {

                console.log("err");
                return next();
            }

            if (doc) {

                res.json(doc);
            }
        });
    }
});

/**
 * respond with training details json
 * when a GET request is made
 * to the training-ctrl.js 
 */
app.get('/trainingDetails', function(req, res, next) {

    if (req.session.userId) {

        db.courseDetails.find(

            function(err, doc) {

                if (err) {

                    console.log("err");
                    return next();
                }

                if (doc) {

                    res.json(doc);
                }
            });
    }
});

/**
 * respond with course details json
 * when a GET request is made
 * to the course-details-ctrl.js 
 */
app.post('/:courseCode', function(req, res, next) {

    var courseCode = req.params.courseCode;

    if (req.session.userId) {

        db.courseDetails.findOne({
            courseCode: courseCode

        }, function(err, doc) {

            if (err) {

                console.log("err");
                return next();
            }

            if (doc) {

                res.json(doc);
            }
        });
    }
});

/**
 * respond with assessment details json
 * when a GET request is made
 * to the assessment-ctrl.js 
 */
app.get('/assessment', function(req, res, next) {
    if (req.session.userId) {

        db.assessmentDetails.find({
            id: req.session.userId

        }, function(err, doc) {

            if (err) {

                console.log("err");
                return next();
            }

            if (doc) {

                res.json(doc);
            }
        });
    }
});

/**
 * respond with assessmnet details json
 * when a GET request is made
 * to the assessment-details-ctrl.js
 */
app.post('/assessment_details/:aCode', function(req, res, next) {

    var assessmentCode = req.body;

    if (req.session.userId) {

        db.assessmentDetails.find({
            id: req.session.userId
        }, {
            details: { $elemMatch: { acode: assessmentCode.aCode } }

        }, function(err, doc) {

            if (err) {

                console.log("err");
                return next();
            }

            if (doc) {

                res.json(doc);
            }
        });
    }
});

/**
 * requesting a session destroy
 * when a GET request is made
 * to the logout.js
 */
app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {

        if (err) {

            console.log(err);
        } else {

            res.redirect('/');
        }
    });
});


app.listen(3000);
console.log("Server is running on port 3000");
