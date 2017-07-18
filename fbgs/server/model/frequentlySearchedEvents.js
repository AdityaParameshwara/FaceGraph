/**
 * Created by Adhitya on 02-06-2017.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var frequentlySearchedEventsData = new Schema({
    userId: {
        type: String,
        required: true
    },
    data: {
        type: Array,
        required: true
    }

});

mongoose.model('frequentlySearchedEventsData', frequentlySearchedEventsData, 'frequentlySearchedEvents');
