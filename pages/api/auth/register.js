import db from './../../../db'
import User from './../../../models/User'
import nc from 'next-connect'
import { hashSync } from 'bcryptjs'
import { signToken } from '../../../auth' 

const handler = nc()

handler.post(async (req, res) => {
    await db.connect();
    const newUser = new User({ name: req.body.name, email: req.body.email, password: hashSync(req.body.password) })
    const user = await newUser.save()
    await db.disconnect()

    const token = signToken(user)
    res.status(200).json({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
})

export default handler;


