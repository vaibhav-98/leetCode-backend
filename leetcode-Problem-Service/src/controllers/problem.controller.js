const { StatusCodes } = require('http-status-codes')
const NotImplementError = require('../errors/Notimplemented.error')
const { ProblemService } = require('../services')
const { ProblemRepository } = require('../repositories')
const { error } = require('winston')

const problemService = new ProblemService ( new ProblemRepository())

function pingProblemController(req,res) {
    return res.json({message : 'Ping controller is runnning'})
}



async function addProblem(req,res,next) {
   try {
     
    console.log("incoming req body", req.body);
    const newproblem = await problemService.createProblem(req.body);
    return res.status(StatusCodes.CREATED).json({
        success:true,
        message: "Successfully created a new problem",
        error: {},
        data: newproblem
    })
     
   } catch (error) {
     next(error)
   }

}



async function getProblems(req,res,next) {
    console.log("come  in controller");
   try {
     const  response = await  problemService.getAllProblem();
     return  res.status(StatusCodes.OK).json({
        success:true,
        message: "Successfully fetched all  problem",
        error: {},
        data: response
     })
   } catch (error) {
    next(error)
   }
    
}


async function getProblem(req,res,next) {

    try {
        const response = await  problemService.getProblem(req.params.id);
        return  res.status(StatusCodes.OK).json({
            success:true,
            message: "Successfully fetched problem by ID",
            error: {},
            data: response
         })

    } catch (error) {
        next(error)
    }
}



async function deleteProblem(req,res,next) {

   try {
      const response = await problemService.deleteProblem(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully deleted problem by id ",
            error: {},
            data: response

        })
   } catch (error) {
      next(error)
   }
}

async function updateProblem(req,res,next) {
    try {
        const response = await problemService.updateProblem(req.params.id, req.body);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully updated problem",
            error: {},
            data: response
        })
    } catch (error) {
        next(error)
    }
}



module.exports = {
    addProblem,
     getProblems,
     getProblem,
     deleteProblem,
    updateProblem,
    pingProblemController
}