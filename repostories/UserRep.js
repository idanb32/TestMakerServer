
const User = require('../models/user')
const container = require('../containerConfig');
const Company = require('../models/company');
const CompanyRep = require('../repostories/CompanyRep')
const mongose = container.resolve('mongoose');



module.exports = class UserRep {
    

    async addUserRep(body){
        await this.addUser(body.userName, body.userPassword,
            body.emailAdress, 
            body.companyID, body.userRole
           );
           
    }

   

    async updateUserFromBody(body){
        await this.updateUser(body.id,body.userName, body.userPassword,
            body.emailAdress, 
            body.companyID, body.userRole)
    }

    async delUserFromBody(body){
        await this.deleteUser(body.id);
    }

    async getUserFromBody(body){
        await this.getUserById(body.id);
    }    

    async addUser(userName,userPassword,emailAdress,companyID,userRole
    ) {
        let companyId = await this.addCompany("6205081a8f0948a7b51e215d");
        let user = new User({
            userName : userName,
            userPassword : userPassword,
            emailAdress : emailAdress,
            companyID : companyId,
            userRole : userRole
        });
        await user.save();
    }

    async addCompany(id) {
        const rep = new CompanyRep()
        let result = rep.getCompanyById(id)
        return result._id;
    }
    

    async deleteUser(id){
        await User.deleteOne({ _id: id });
    }

    async updateUser(id,userName,userPassword,emailAdress,companyId,userRole
    ) {
        
        await User.updateOne({_id:id},{
            userName : userName,
            userPassword : userPassword,
            emailAdress : emailAdress,
            companyID : companyId,
            userRole : userRole
        });
    }

    async getUserById(id) {
        let theUser = await User.findById(id);
        console.log(theUser.userName);
        return theUser;
    }

    async getAllUsers(){
        let Users = await User.find();
        return Users;
    }
}