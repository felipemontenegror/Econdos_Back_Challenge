const express = require('express')
const User = require('../../models/user')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const MSGS = require('../../messages')



router.get('/', async (req, res, next) => {
    try {
      const user = await User.find({})
      res.json(user)
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
  })


  router.get('/:userId', [], async(req, res, next)=> {  
    try{
      const id = req.params.userId
      const user = await User.findOne({_id : id}) 
      if(user){
        res.json(user)
      }else{
        res.status(404).send({"error" : MSGS.USER404})
      }
    }catch(err){
      console.error(err.message)
      res.status(500).send({"error" : MSGS.GENERIC_ERROR})
    }
  })

  
  router.post('/',[
    check('name').not().isEmpty(),
    check('email', 'email is not valid').isEmail(),
], async (req, res, next) => {
    try{
      let { name, email } = req.body

      const errors = validationResult(req)  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }else{
        let user = new User({name, email})      
        await user.save()
        if (user.id){
          res.json(user);
        }
      }
      
    }catch(err){
      console.error(err.message)
      res.status(500).send({"error" : MSGS.GENERIC_ERROR })
    }
  })


  router.patch('/:id', async (req, res, next) => {  
    try {
      const id = req.params.id
      const update = { $set: req.body } // operador $set de update de valor
      const user = await User.findByIdAndUpdate(id, update, { new: true })
      if (user) {
        res.send(user)
      } else {
        res.status(404).send({ error: MSGS.USER404 })
      }
    }catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
  });


  router.delete('/:userId', async(req, res, next)=> {
    try{
      const id = req.params.userId   
      const user = await User.findOneAndDelete({_id : id}) 
      if (user){
        res.json(user)
      }else{
        res.status(404).send({"error" : MSGS.USER404})
      }
    }catch(err){
      console.error(err.message)
      res.status(500).send({"error" : MSGS.GENERIC_ERROR})
    }
  })


  module.exports = router