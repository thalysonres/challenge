const product = require('../../database/api');
const mongoose = require('../../database/index');

const WishListSchema = new mongoose.Schema({

    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        require: true,
        unique: true,
    },
    product: [{
        type: product, 
        ref: 'Product',
        require: true, 
    }],

});

const WishList = mongoose.model('WishList', WishListSchema, 'wish_lists');

module.exports = WishList;
