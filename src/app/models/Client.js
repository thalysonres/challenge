const mongoose = require('../../database');


const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    } ,
    wishList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WishList',
        require: false,
        unique: true,
    }]
});

const Client = mongoose.model('Client', ClientSchema, 'clients');

module.exports = Client;
