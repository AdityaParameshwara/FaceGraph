/**
 * Created by Adhitya on 03-06-2017.
 */
var mongoose = require("mongoose");

var Oploggery = require('oploggery');
var favouriteUsers = require("../model/favouriteUsers");
var favouritePages = require("../model/favouritePages");
var favouriteEvents = require("../model/favouriteEvents");

var oplogger = new Oploggery({
    uri: 'mongodb://localhost:27017/fbgs',
    format: 'pretty'
});

oplogger.watch('fbgs.frequentlySearchedUsers', function(event) {
   console.log(event);
});

var Schema = mongoose.Schema;


var frequentlySearchedUsersData = new Schema({
    email: {
        type: String,
        required: true
    },
    data: [
        {
            fbId: Number,
            count: Number
        }
    ]


});

var frequentlySearchedPagesData = new Schema({
    email: {
        type: String,
        required: true
    },
    data: [
        {
            fbId: Number,
            count: Number
        }
    ]
});

var frequentlySearchedEventsData = new Schema({
    email: {
        type: String,
        required: true
    },
    data: [
        {
            fbId: Number,
            count: Number
        }
    ]
});

var freqSearchedUserDetails = mongoose.model('frequentlySearchedUsersData', frequentlySearchedUsersData, 'frequentlySearchedUsers');
var favouriteUserDetails = mongoose.model('favouriteUsersData', 'favouriteUsers');
var freqSearchedPageDetails = mongoose.model('frequentlySearchedPagesData', frequentlySearchedPagesData, 'frequentlySearchedPages');
var favouritePageDetails = mongoose.model('favouritePagesData', 'favouritePages');
var freqSearchedEventDetails = mongoose.model('frequentlySearchedEventsData', frequentlySearchedEventsData, 'frequentlySearchedEvents');
var favouriteEventDetails = mongoose.model('favouriteEventsData', 'favouriteEvents');

frequentlySearchedUsersData.pre('save', function(next) {
    next();
});

frequentlySearchedPagesData.pre('save', function(next) {
    next();
});

frequentlySearchedEventsData.pre('save', function(next) {
    next();
});

exports.saveFreqSearchedUser = function(req, res) {
    var email = req.body.email;
    var fbid = parseInt(req.body.fbid);
    freqSearchedUserDetails.findOne({email: email}, function(err, data) {
        if(err) {
            res.send(err);
        }
        if(!data) {
            var doc = {
                email: email,
                data: [
                    {
                        fbId: fbid,
                        count: 1
                    }
                ]
            };
            var newUser = new freqSearchedUserDetails(doc);
            newUser.save(function(err){
               // res.send(err);
            });
            res.send("done");
        }
        else{
            var j = 0;
            for(var i = 0; i < data.data.length; i++) {
                if(fbid != data.data[i].fbId) {
                    j++;
                }
                else{
                    data.data[i].count += 1;
                    break;
                }
            }
            if(j == data.data.length) {
                data.data[data.data.length] = {
                    fbId: fbid,
                    count: 1
                };
            }
            data.markModified('anything');
            data.save(function(err1, updated) {

                if(err1) {
                    res.send(err1);
                }
            });
            res.send("Updated");
        }
    });
};

exports.getFreqSearchedUser = function(req, res) {
  var email = req.body.email;
  freqSearchedUserDetails.findOne({email: email}, function(err, data) {
     if(!err){
         freqSearchedUserDetails.aggregate([
             { $unwind: "$data" },
             { $sort: {"data.count": -1}}
         ], function (err, result){
             if(err) {
                 res.send(err);
             }
             else {
                 res.send(result);
             }
         });
     }
  });
};

exports.getFavouriteUsers = function(req, res) {
  var email = req.body.email;
  favouriteUserDetails.findOne({email:email}, function(err, data){
     if(!err){
        res.send(data);
     }
  });
};

exports.updateFavouriteUsers = function(req, res) {
    var email = req.body.email;
    var fbid = parseInt(req.body.fbid);
    favouriteUserDetails.find({email: email}, function(err, data) {
        if(data.length == 0) {
            var doc = {
                email: email,
                data: [fbid]
            };
            favouriteUserDetails.findOneAndUpdate({email: email}, doc, {upsert: true}, function(err, data) {
                if(err) {
                    res.send("Error");
                }
                else{
                    res.send(doc);
                }
            });
        }
        else {
            if(data[0].data.indexOf(fbid) == -1) {
                favouriteUserDetails.update({email:email}, {$push: {"data":fbid}}, function(err, dataUpdated) {
                    if(err) {
                        res.send("Error");
                    }
                    else{
                        data[0].data[data[0].data.length] = fbid;
                        res.send(data);
                    }
                });
            }
            else{
                favouriteUserDetails.update({email:email}, {$pull: {"data" : fbid}}, function(err, doc) {
                    if(err) {
                        res.send("Error");
                    }
                    else{
                        for(var i = 0; i < data[0].data.length; i++) {
                            if(data[0].data[i] == fbid) {
                                data[0].data.splice(i, 1);
                                break;
                            }
                        }
                        res.send(data);
                    }
                });
            }
        }
    });
};

exports.saveFreqSearchedPage = function(req, res) {
    var email = req.body.email;
    var fbid = parseInt(req.body.fbid);
    freqSearchedPageDetails.findOne({email: email}, function(err, data) {
        if(err) {
            res.send(err);
        }
        if(!data) {
            var doc = {
                email: email,
                data: [
                    {
                        fbId: fbid,
                        count: 1
                    }
                ]
            };
            var newPage = new freqSearchedPageDetails(doc);
            newPage.save(function(err){
               // res.send(err);
            });
            res.send("done");
        }
        else{
            var j = 0;
            for(var i = 0; i < data.data.length; i++) {
                if(fbid != data.data[i].fbId) {
                    j++;
                }
                else{
                    data.data[i].count += 1;
                    break;
                }
            }
            if(j == data.data.length) {
                data.data[data.data.length] = {
                    fbId: fbid,
                    count: 1
                };
            }
            data.markModified('anything');
            data.save(function(err1, updated) {

                if(err1) {
                    res.send(err1);
                }
            });
            res.send("Updated");
        }
    });
};

exports.getFreqSearchedPage = function(req, res) {
  var email = req.body.email;
  freqSearchedPageDetails.findOne({email: email}, function(err, data) {
     if(!err){
         freqSearchedPageDetails.aggregate([
             { $unwind: "$data" },
             { $sort: {"data.count": -1}}
         ], function (err, result){
             if(err) {
                 res.send(err);
             }
             else {
                 res.send(result);
             }
         });
     }
  });
};

exports.getFavouritePages = function(req, res) {
  var email = req.body.email;
  favouritePageDetails.findOne({email:email}, function(err, data){
     if(!err){
        res.send(data);
     }
  });
};

exports.updateFavouritePages = function(req, res) {
    var email = req.body.email;
    var fbid = parseInt(req.body.fbid);
    favouritePageDetails.find({email: email}, function(err, data) {
        if(data.length == 0) {
            var doc = {
                email: email,
                data: [fbid]
            };
            favouritePageDetails.findOneAndUpdate({email: email}, doc, {upsert: true}, function(err, data) {
                if(err) {
                    res.send("Error");
                }
                else{
                    res.send(doc);
                }
            });
        }
        else {
            if(data[0].data.indexOf(fbid) == -1) {
                favouritePageDetails.update({email:email}, {$push: {"data":fbid}}, function(err, dataUpdated) {
                    if(err) {
                        res.send("Error");
                    }
                    else{
                        data[0].data[data[0].data.length] = fbid;
                        res.send(data);
                    }
                });
            }
            else{
                favouritePageDetails.update({email:email}, {$pull: {"data" : fbid}}, function(err, doc) {
                    if(err) {
                        res.send("Error");
                    }
                    else{
                        for(var i = 0; i < data[0].data.length; i++) {
                            if(data[0].data[i] == fbid) {
                                data[0].data.splice(i, 1);
                                break;
                            }
                        }
                        res.send(data);
                    }
                });
            }
        }
    });
};

exports.saveFreqSearchedEvent = function(req, res) {
    var email = req.body.email;
    var fbid = parseInt(req.body.fbid);
    freqSearchedEventDetails.findOne({email: email}, function(err, data) {
        if(err) {
            res.send(err);
        }
        if(!data) {
            var doc = {
                email: email,
                data: [
                    {
                        fbId: fbid,
                        count: 1
                    }
                ]
            };
            var newEvent = new freqSearchedEventDetails(doc);
            newEvent.save(function(err){
               // res.send(err);
            });
            res.send("done");
        }
        else{
            var j = 0;
            for(var i = 0; i < data.data.length; i++) {
                if(fbid != data.data[i].fbId) {
                    j++;
                }
                else{
                    data.data[i].count += 1;
                    break;
                }
            }
            if(j == data.data.length) {
                data.data[data.data.length] = {
                    fbId: fbid,
                    count: 1
                };
            }
            data.markModified('anything');
            data.save(function(err1, updated) {

                if(err1) {
                    res.send(err1);
                }
            });
            res.send("Updated");
        }
    });
};

exports.getFreqSearchedEvent = function(req, res) {
  var email = req.body.email;
  freqSearchedEventDetails.findOne({email: email}, function(err, data) {
     if(!err){
         freqSearchedEventDetails.aggregate([
             { $unwind: "$data" },
             { $sort: {"data.count": -1}}
         ], function (err, result){
             if(err) {
                 res.send(err);
             }
             else {
                 res.send(result);
             }
         });
     }
  });
};

exports.getFavouriteEvents = function(req, res) {
  var email = req.body.email;
  favouriteEventDetails.findOne({email:email}, function(err, data){
     if(!err){
        res.send(data);
     }
  });
};

exports.updateFavouriteEvents = function(req, res) {
    var email = req.body.email;
    var fbid = parseInt(req.body.fbid);
    favouriteEventDetails.find({email: email}, function(err, data) {
        if(data.length == 0) {
            var doc = {
                email: email,
                data: [fbid]
            };
            favouriteEventDetails.findOneAndUpdate({email: email}, doc, {upsert: true}, function(err, data) {
                if(err) {
                    res.send("Error");
                }
                else{
                    res.send(doc);
                }
            });
        }
        else {
            if(data[0].data.indexOf(fbid) == -1) {
                favouriteEventDetails.update({email:email}, {$push: {"data":fbid}}, function(err, dataUpdated) {
                    if(err) {
                        res.send("Error");
                    }
                    else{
                        data[0].data[data[0].data.length] = fbid;
                        res.send(data);
                    }
                });
            }
            else{
                favouriteEventDetails.update({email:email}, {$pull: {"data" : fbid}}, function(err, doc) {
                    if(err) {
                        res.send("Error");
                    }
                    else{
                        for(var i = 0; i < data[0].data.length; i++) {
                            if(data[0].data[i] == fbid) {
                                data[0].data.splice(i, 1);
                                break;
                            }
                        }
                        res.send(data);
                    }
                });
            }
        }
    });
};