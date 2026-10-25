const accountModel = require('../models/account.model')


async function createAccountUser(req, res) {
    const user = req.user
    console.log(user) // should now print the user document
    const account = await accountModel.create({ user: user._id })
    res.status(201).json({ account })
}

module.exports={createAccountUser}