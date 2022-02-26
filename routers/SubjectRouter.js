const express = require('express');
const router = express.Router();


const container = require('../repContainer');
const rep = container.resolve('SubjectRep');


router.post('/Add',async (req,res)=>{
    await rep.addSubject(req.body);
    res.send('Subject has been added');
});
router.post('/Delete',async (req,res)=>{
    await rep.delSubjectFromBody(req.body);
    res.send('Subject has been deleted');
});
router.post('/Get',async (req,res)=>{
    let Company =   await rep.getSubjectFromBody(req.body);
    res.send(Company);
});
router.post('/GetByCompanyId',async (req,res)=>{
    let Company =   await rep.getSubjectsByCompanyFromBody(req.body);
    res.send(Company);
});

router.get('/GetAll',async (req,res)=>{
   let Companyies = await rep.getAllSubject();
    res.send(Companyies);
});
router.post('/Update',async (req,res)=>{
    await rep.updateSubjectFromBody(req.body);
    res.send('Subject has been updated');
});
router.post('/GetSubjectByName',async (req,res)=>{
    let subject =await rep.getSubjectNameBody(req.body);
    res.send(subject);
});



module.exports = router;