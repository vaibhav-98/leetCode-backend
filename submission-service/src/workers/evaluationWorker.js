const { Worker } = require('bullmq');
const redisConnection = require('../config/redisConfig');
const axios = require('axios');
const Submission = require('../models/submissionModels');

function evaluationWorker(queue) {
    new Worker('EvaluationQueue', async job => {
        if (job.name === 'EvaluationJob') {
            try {
                const { response, submissionId, userId } = job.data;
                
                console.log("Processing evaluation for submission:", submissionId);
                console.log("Response:", response);

                // Map status from Evaluator to Submission DB status
                let finalStatus = "Success";
                if (response.status === "WA") {
                    finalStatus = "WA";
                } else if (response.status === "CE") {
                    finalStatus = "CE";
                } else if (response.status === "ERROR") {
                    finalStatus = "RE";
                    if (response.output === "TLE") finalStatus = "TLE";
                } else if (response.status !== "SUCCESS") {
                    finalStatus = "RE";
                }

                // Update the database
                await Submission.findByIdAndUpdate(submissionId, {
                    status: finalStatus,
                    output: response.output
                });

                // Notify other services (e.g., Socket Service / Frontend)
                await axios.post('http://localhost:3001/sendPayload', {
                    userId: userId,
                    payload: job.data
                });

                console.log(`✅ Submission ${submissionId} updated setting to ${finalStatus}`);
            } catch(error) {
                console.log("❌ Worker Error:", error);
            }
        }
    }, {
        connection: redisConnection
    });
}

//console.log("abc", evaluationWorker);


module.exports = evaluationWorker;




