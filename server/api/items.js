'use strict';

const router = require('express').Router();
const { Translation } = require('../db');
const Item = require('../db/models/Item');
const User = require('../db/models/User')

router.get('/', async (req, res, next) => {
    try {
        const items = await Item.findAll({
            include: [
                { model: Translation , as: "nameTranslation" },
                { model: Translation , as: "descriptionTranslation" }
            ]
        });
        if (!items) {
            return res.status(404).json({ error:"No Items Found" });
        }

        const language = req.get('Accept-Language')

        const translatedObjects = items.map((item) => {
            return translateItem(item, language)
        })
        res.json(translatedObjects);
    } catch (error) {
        next(error);
    }
});

// router.post("/", async (req, res, next) => {
//     // 1) grab the token in the authorization header
//     // 2) grab the user for the token
//     // 3) if user is admin, do the work, otherwise throw 401
//     const token = req.headers.authorization
//     const user = await User.findByToken(token)
//     if (user.isAdmin) {
//         // do the thing
//         Item.create(req.body)
//     } else {
//         res.send(401)
//     }
// });

function translateItem(item, language) {
    return {
        id: item.id,
        imageUrl: item.imageUrl,
        price: item.price,
        name: item.nameTranslation.getLocalizedString(language),
        description: item.descriptionTranslation.getLocalizedString(language),
    }
}
router.get('/:id', async (req, res, next) => {
    try {
        const singleItem = await Item.findByPk(req.params.id, {
            include: [
                { model: Translation , as: "nameTranslation" },
                { model: Translation , as: "descriptionTranslation" }
            ]
        });
        if (!singleItem) {
            return res.status(404).json({ error:"No Item Found" });
        }

        const language = req.get('Accept-Language')
        const translatedItem = translateItem(singleItem, language)
        res.json(translatedItem);
    } catch (error) {
        next(error);
    }
});

module.exports = router;