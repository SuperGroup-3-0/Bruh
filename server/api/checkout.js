'use strict';

const router = require('express').Router();
const Order = require('../db/models/Order');
const OrderItem = require('../db/models/OrderItem');
const Item = require('../db/models/Item');
const User = require('../db/models/User');


router.post('/', async (req, res, next) => {
    try {
        const { userId, cart } = req.body;
        console.log(req.body)
        const order = await Order.create({userId});
       for (const { itemId, quantity } of cart){
        const item = await Item.findByPk(itemId);
        await OrderItem.create({
            orderId: order.id,
            itemId: item.id,
            quantity,
        });
        const user = await User.findByPk(userId);
        await order.setUser(user);
       }
       res.status(200).json({ message: "Order placed successfully" });
    } catch (error) {
        next(error)
    }
});

module.exports = router;