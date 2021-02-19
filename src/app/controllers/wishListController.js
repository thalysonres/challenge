const express = require('express');
const WishList = require('../models/WishList');
const Product = require('../../database/api');

const router = express.Router();


router.get('/', async (req,res) => {
    try{
        const wishList = await WishList.find()
        .populate('client', 'name email');

        res.send({ wishList });
    }
    catch(err){
        res.status(400).send({ error: 'Error loading wish list' });
    }
});

router.get('/:wishListId', async (req,res) => {
    try{
        const wishList = await WishList.findById(req.params.wishListId)
        .populate('client', 'name email');

        return res.send({ wishList });
    }
    catch(err){
        res.status(400).send({ error: 'Error loading product from the wish list' });
    }
});

router.post('/', async (req,res) => {
    const { productId }  = req.body;

    try{
        if (await Product.findOne({ productId }))
            return res.status(400).send({ error: 'Product already registered'});
        
        const { client, products } = req.body;
        const wishList = await WishList.create(client);



        return res.status(201).send({ wishList });
    } catch(err){
        return res.status(400).send({ error: 'Error adding product from wish list' });
    }
});

router.put('/', async (req,res) => {
    try{
        const id = req.body._id;
        const wishList = await WishList.findByIdAndUpdate(id, req.body);

        return res.send({ wishList });
    }
    catch(err){
        res.status(400).send({ error: 'Error updating wish list' }); 
    }
});

router.delete('/', async (req,res) => {
    try{
        const id = req.body._id;
        await WishList.findByIdAndRemove(id);

        return res.send({ ok: 'Deleted product from the wish list' });
    }
    catch(err){
        res.status(400).send({ error: 'Error deleting product from the wish list' });
    }
});

module.exports = app => app.use('/wish-list', router);
