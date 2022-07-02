import db from './../../../db'
import User from './../../../models/User'
import nc from 'next-connect'
import { compareSync } from 'bcryptjs'
import { signToken } from '../../../auth'

const handler = nc()

handler.post(async (req, res) => {
    await db.connect();
    const user = await User.findOne({ email: req.body.email })
    await db.disconnect()

    if (user && compareSync(req.body.password, user.password)) {
        const token = signToken(user)
        res.status(200).json({
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401).send({ message: 'invalid user or password' })
    }
})

export default handler;