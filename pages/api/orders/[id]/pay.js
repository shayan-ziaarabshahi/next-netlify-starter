import nc from 'next-connect';
import Order from './../../../../models/Order'
import db from '../../../../db'
import { isAuth } from './../../../../auth'
import { onError } from './../../../../error'

const handler = nc({
    onError
});
handler.use(isAuth)

handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findOne({user:req.user._id, _id:req.query.id}); 
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now()
    order.paidAt = Date.now()

    order.paymentResult.status = req.body.status

    const paidOrder = await order.save()
    await db.disconnect();
    res.send('order paid', {order: paidOrder})
  }
  await db.disconnect();
  res.status(404).send({message: 'order not found'});
});

export default handler;