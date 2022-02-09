const container = require('../containerConfig');
const mongoose = container.resolve('mongoose');
const Scheme  = mongoose.Schema;

const companyScheme = new Scheme({
    companyName:{
        type: String,
        required: [true, 'Company name is required']
    }
});


const Company = mongoose.model('Company',companyScheme);
module.exports = Company;