'use strict';

const router = require('express').Router();
const Item = require('../db/models/Item');
const User = require('../db/models/User')

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

router.post("/", async (req, res, next) => {
    // 1) grab the token in the authorization header
    // 2) grab the user for the token
    // 3) if user is admin, do the work, otherwise throw 401
    const token = req.headers.authorization
    const user = await User.findByToken(token)
    if (user.isAdmin) {
        // do the thing
        Item.create(req.body)
    } else {
        res.send(401)
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