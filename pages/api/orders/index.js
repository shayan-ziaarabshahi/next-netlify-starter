import nc from 'next-connect';
import Order from './../../../models/Order'
import db from '../../../db'
import { onError } from './../../../error'
import { isAuth } from './../../../auth';
 
const handler = nc({
    onError
});

handler.use(isAuth)

handler.post(async (req, res) => {

    await db.connect();
    const newOrder = new Order({
        user: req.user._id,
         ...JSON.parse(req.body)
        });
    const order = await newOrder.save();
    res.status(201).send(order)
});

export default handler;