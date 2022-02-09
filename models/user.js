const container = require('../containerConfig');
const mongoose = container.resolve('mongoose');
const Scheme  = mongoose.Schema;




const UserScheme = new Scheme({
    userName: {
        type: String,
        required: [true, 'Username is required']
    },
    userPassword : {
        type: String,
        required: [true, 'Password is required']
    },
    emailAdress :{
        type: String,
        required: [true, 'Email adress is required']
    },
    companyID:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Company'
    },
    userRole:{
        type: String,
        enum : ['Admin','Student'],
        default: 'Student'
    }
});



const user = mongoose.model('User',UserScheme);
module.exports = user;