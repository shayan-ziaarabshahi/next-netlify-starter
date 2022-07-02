import nc from 'next-connect'
import db from '../../../db'
import Order from '../../../models/Order'
import { isAuth } from '../../../auth'


const handler = nc()
handler.use(isAuth)

handler.get(async (req, res) => {
    await db.connect()
    const orders = await Order.find({ user: req.user._id })
    await db.disconnect()
    res.send(orders)
})

export default handler;