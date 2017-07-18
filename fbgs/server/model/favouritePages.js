/**
 * Created by Adhitya on 16-06-2017.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var favouritePagesData = new Schema({
    userId: {
        type: String,
        required: true
    },
    data: [Number]

});

mongoose.model('favouritePagesData', favouritePagesData, 'favouritePages');
