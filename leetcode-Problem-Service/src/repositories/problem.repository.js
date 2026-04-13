const logger = require('../config/logger.config');
const NotFound = require('../errors/Notfound.error');
const { Problem } = require('../models')


class ProblemRepository  {
    
    async createProblem(problemData) {
        try {

            const problem = await Problem.create({
                title: problemData.title,
                description: problemData.description,
                codeStubs: problemData.codeStubs,
                testCases: (problemData.testCases) ? problemData.testCases : []
            });

            return problem;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getAllProblem() {

        try {
            const problem = await Problem.find({})
            return problem
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getProblem(id) {
        try {
            const problem = await Problem.findById(id); 
           
            if(!problem) {
               throw new NotFound("Problem", id)
            }
            return problem;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteProblem(id) {
        try {
            const deleteProblem = await Problem.findByIdAndDelete(id);
            if(!deleteProblem){
                logger.error(`Problem with id : ${id} not found in the db`)
                throw new NotFound("Problem", id);
            }
            return deleteProblem
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateProblem(id, updateData) {
        try {
            const updatedProblem = await Problem.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedProblem) {
                throw new NotFound("Problem", id);
            }
            return updatedProblem;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

module.exports = ProblemRepository;


