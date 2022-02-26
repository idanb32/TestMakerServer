const Subject = require('../models/subject');

module.exports = class SubjectRep {

    async addSubjectRep(body){
        await this.addSubject(body.subjectName)
    }

    async getSubjectsByCompanyFromBody(body)
    {
        console.log('inside');
       let result =  await this.getSubWithCompany(body.companyID)
        return result;
    }
    async getSubjectNameBody(body){
       return await this.getSubjectByName(body.subjectName)
    }

    async addSubject(subjectNameInput)
    {
        let newSubject = new Subject({
            subjectName: subjectNameInput
           
        });
        await Subject.save(newSubject);
    }
    async updateSubjectBody(body){
        await this.updateSubject(body._id,body.subjectName)
    }

    async delSubjectFromBody(body){
        await this.deleteSubject(body.id);
    }

    async getSubjectFromBody(body){
        let result = await this.getSubjectById(body.id);
        return result;
    }    

    
    async deleteSubject(id){
        await Subject.deleteOne({ _id: id });
    }

    async updateSubject(id,subjectNameInput
    ) {
        
        await Subject.updateOne({_id:id},{
            subjectName :subjectNameInput
        });
    }

    async getSubjectById(id) {
        let SubjectReturn = await Subject.findById(id);
        
        return SubjectReturn;
    }
    async getSubWithCompany(companyID)
    {
        let subjectWCompany = await Subject.find({companyId:companyID})
        return subjectWCompany;
    }

    async getSubjectByName(subjectNameInput)
    {

        let subject = await Subject.find({subjectName:subjectNameInput})
        console.log(subject);
        return subject;
    }

    async getAllSubject(){
        let Subjects = await Subject.find();
        return Subjects;
    }
}