import nc from 'next-connect';
import db from './../../../../db'
import Order from './../../../../models/Order'
import { isAuth } from './../../../../auth'


const handler = nc();
handler.use(isAuth)

handler.get(async (req, res) => {
  await db.connect();
  const order = await Order.findOne({user:req.user._id});
  await db.disconnect();
  res.send(order);
});

export default handler;