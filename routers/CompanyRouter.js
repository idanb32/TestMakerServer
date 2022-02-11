const express = require('express');
const router = express.Router();


const container = require('../repContainer');
const rep = container.resolve('CompanyRep');


router.post('/Add',async (req,res)=>{
    await rep.addCompanyRep(req.body);
    res.send('Company has been added');
});
router.post('/Delete',async (req,res)=>{
    await rep.delCompanyFromBody(req.body);
    res.send('Company has been deleted');
});
router.post('/Get',async (req,res)=>{
    let company =   await rep.getCompanyFromBody(req.body);
    res.send(company);
});
router.get('/GetAll',async (req,res)=>{
   let allCompany = await rep.getAllCompany();
    res.send(allCompany);
});
router.post('/Update',async (req,res)=>{
    await rep.updateCompanyBody(req.body);
    res.send('Company has been updated');
});


module.exports = router;