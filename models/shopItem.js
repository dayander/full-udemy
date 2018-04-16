'use strict';


var mongoose = require('mongoose');


var itemSchema = mongoose.Schema({
    title: String,
    brand: String,
    description: String,
    images: String,
    price:  Number,
    location: String,
    shippingLocations: String,

});


var Books = mongoose.model('Books', itemSchema);


module.exports = Books;