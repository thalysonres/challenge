const express = require('express');
const Client = require('../models/Client');

const router = express.Router();

router.get('/', async (req,res) => {
    try{
        const clients = await Client.find();
        res.send({ clients });
    }
    catch(err){
        res.status(400).send({ error: 'Error loading clients' });
    }
});

router.get('/:clientId', async (req,res) => {
    try{
        const client = await Client.findById(req.params.clientId);
        return res.send({ client });
    }
    catch(err){
        res.status(400).send({ error: 'Error loading client' });
    }
});

router.post('/', async (req,res) => {

    const { email } = req.body;

    try{
        if (await Client.findOne({ email }))
            return res.status(400).send({ error: 'Email already registered'});

        const client = await Client.create(req.body);

        return res.status(201).send({ client });

    } catch(err){
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.put('/', async (req,res) => {
    try{
        const id = req.body._id;
        const client = await Client.findByIdAndUpdate(id, req.body);

        return res.send({ client });
    }
    catch(err){
        res.status(400).send({ error: 'Error updating client' }); 
    }
});

router.delete('/', async (req,res) => {
    try{
        const id = req.body._id;
        await Client.findByIdAndRemove(id);

        return res.send({ ok: 'Deleted client' });
    }
    catch(err){
        res.status(400).send({ error: 'Error deleting client' });
    }
});

module.exports = app => app.use('/client', router);
 