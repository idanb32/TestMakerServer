const container = require('../containerConfig');
const mongoose =  container.resolve('mongoose');
const Scheme  = mongoose.Schema;

const subjectScheme = new Scheme({
    subjectName:{
        type: String,
        required: [true, 'Company name is required']
    },
    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Company'
    }
});


const Subject = mongoose.model('Subject',subjectScheme);
module.exports = Subject;