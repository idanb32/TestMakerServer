const express = require('express');
const router = express.Router();


const UserRep = require('../repostories/UserRep');
const rep = new UserRep();


router.post('/Add',async (req,res)=>{
    await rep.addUserRep(req.body);
    res.send('User has been added');
});
router.post('/Delete',async (req,res)=>{
    await rep.delUserFromBody(req.body);
    res.send('User has been deleted');
});
router.post('/Get',async (req,res)=>{
    let user =   await rep.getUserFromBody(req.body);
    res.send(user);
});
router.get('/GetAll',async (req,res)=>{
   let allUsers = await rep.getAllUsers();
    res.send(allUsers);
});
router.post('/Update',async (req,res)=>{
    await rep.updateUserFromBody(req.body);
    res.send('User has been updated');
});


module.exports = router;