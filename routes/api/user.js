const express = require('express')
const User = require('../../models/user')
const router = express.Router()



router.get('/', async (req, res, next) => {
    try {
      const user = await User.find({})
      res.json(user)
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": "error" })
    }
  })

  module.exports = router