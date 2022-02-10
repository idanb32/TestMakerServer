const Company = require('../models/company');

module.exports = class CompanyRep {

    async addCopmpanyRep(body){
        await this.addCopmpany(body.companyName)
    }

    async addCopmpany(companyName)
    {
        let newCompany = new Company({
            companyName: companyName
           
        });
        await Company.save(newCompany);
    }
    async updateCompanyBody(body){
        await this.updateCompany(body._id,body.companyName)
    }

    async delCompanyFromBody(body){
        await this.deleteCompany(body.id);
    }

    async getCompanyFromBody(body){
        await this.getCompanyById(body.id);
    }    

    
    async deleteCompany(id){
        await Company.deleteOne({ _id: id });
    }

    async updateCompany(id,companyName
    ) {
        
        await Company.updateOne({_id:id},{
            companyName :companyName
        });
    }

    async getCompanyById(id) {
        let CompanyReturn = await Company.findById(id);
        return CompanyReturn;
    }

    async getAllCompany(){
        let Companies = await Company.find();
        return Companies;
    }
}