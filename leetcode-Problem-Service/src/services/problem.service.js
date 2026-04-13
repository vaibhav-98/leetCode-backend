const sanitizeMarkdownContent = require("../utils/markdownSenitizer");


class ProblemService {

    constructor(problemRepository) {
        this.problemRepository = problemRepository;
    }

    async createProblem(problemData) {
        try {
            // 1.  Sanitize the  markdown for  description
            problemData.description = sanitizeMarkdownContent(problemData.description);
              
            console.log("Problem data", problemData);
         const problem = await this.problemRepository.createProblem(problemData);
           console.log("Problem created", problem);
          return problem;
        } catch (error) {
            console.log(error);
            throw error;
            
        }
    }

    async getAllProblem() {
        const problems = await this.problemRepository.getAllProblem();
        return problems

    }
    
    async getProblem(problemId) {
        const problem = await this.problemRepository.getProblem(problemId)
        return problem
    }

    async deleteProblem(problemId) {
        const problem = await this.problemRepository.deleteProblem(problemId)
        return problem
    }

    async updateProblem(problemId, updateData) {
        try {
            if (updateData.description) {
                updateData.description = sanitizeMarkdownContent(updateData.description);
            }
            const problem = await this.problemRepository.updateProblem(problemId, updateData);
            return problem;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}




module.exports  = ProblemService






