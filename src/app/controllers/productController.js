const axios = require('axios');
const express = require('express');

const router = express.Router()

router.get('/:nroPag', async(req, res) => {
    try {
        const nroPag = req.params.nroPag;
        const { data } = await axios(`http://challenge-api.luizalabs.com/api/product/?page=${nroPag}`);
        
        return res.json(data);
    } catch(err) {
        res.status(400).send({ error: 'Error finding products' });
    }
});

router.get('/:productId', async(req, res) => {
    try {
        const productId = req.params.id;
        const { data } = await axios(`http://challenge-api.luizalabs.com/api/product/${productId}/`);
        
        return (data);
    } catch(err) {
        res.status(400).send({ error: 'Error finding product' });
    }
});

module.exports = app => app.use('/product', router);
