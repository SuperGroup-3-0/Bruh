'use strict';

const router = require('express').Router();
const Item = require('../db/models/Item');

router.get('/', async (req, res, next) => {
    try {
        const items = await Item.findAll();
        if (!items) {
            return res.status(404).json({ error:"No Items Found" });
        }
        res.json(items);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const singleItem = await Item.findByPk(req.params.id);
        if (!singleItem) {
            return res.status(404).json({ error:"No Item Found" });
        }
        res.json(singleItem);
    } catch (error) {
        next(error);
    }
});

module.exports = router;