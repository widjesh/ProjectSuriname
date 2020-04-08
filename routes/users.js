var express = require('express');
var router = express.Router();
const User = require("../models/user");
const bycrpt = require('bcrypt');

//API - Retrieve all users
router.get('/',async (req,res)=>{
  try{
    const users =  await User.find();
    if(!users){
      res.json({ message: "Users Not Found" });
    }else{
      res.json(users);
    }
  }catch(err){
    res.json(err);
  }
});

//API - Users gaat registreren - DONE
router.post('/',async (req,res)=>{
  try{
    const isAvailable = User.findOne({email:req.body.email},async (err,data)=>{
      if(!err){
        if(data !== null){
          res.json('User already exists');
        }else{
          const incomingUser = new User({
          userno: req.body.userno,
          name: req.body.name,
          address: req.body.address,
          email: req.body.email,
          phone: req.body.phone,
          password: bycrpt.hashSync(req.body.password,10),
          isadmin: req.body.isadmin
        });
        const savedUser = await incomingUser.save();
        if(!savedUser){ 
          res.status(500).send(`Failed to save in database`)
        }else{
          res.status(200).json(savedUser);
        }
        }
      }else{
        res.json('Failed to check if user exists');
      }
    });

      
  }catch(err){
    res.status(500).send(`Failed to fetch data from request error: ${err}`);
  }
});

module.exports = router;
