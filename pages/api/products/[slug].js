import nc from 'next-connect';
import Product from './../../../models/Product'
import db from '../../../db'

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.findOne({slug:req.query.slug});
  await db.disconnect();
  res.send(product);
});

export default handler;