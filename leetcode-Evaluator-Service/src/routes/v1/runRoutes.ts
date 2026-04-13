import express from "express";
import { runCodeZodSchema } from "../../dtos/runCodeDto";
import { runCode } from "../../controllers/runController";
import { validate } from "../../validators/zodValidator";

const runRouter = express.Router();

runRouter.post("/", validate(runCodeZodSchema), runCode);

export default runRouter;

