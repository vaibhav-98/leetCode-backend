import { Request, Response } from "express";
import { RunCodeDto } from "../dtos/runCodeDto";
import createExecutor from "../utils/ExecutorFactory";

export async function runCode(req: Request, res: Response) {
  const dto = req.body as RunCodeDto;
  const strategy = createExecutor(dto.language);

  if (!strategy) {
    return res.status(400).json({
      success: false,
      message: "Unsupported language",
      error: { language: dto.language },
      data: null,
    });
  }

  try {
    const testCases = [{ input: dto.input ?? "", output: "" }];
    const execution = await strategy.execute(dto.code, testCases);
    return res.status(200).json({
      success: true,
      message: "Run completed",
      error: {},
      data: execution,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Run failed",
      error: { message: String(err) },
      data: null,
    });
  }
}

