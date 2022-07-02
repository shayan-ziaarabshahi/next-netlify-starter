import db from "./db"

export const onError = async (err, req, res, next) => {
    await db.disconnect()
    res.status(500).send({ message: err.toString() })
}