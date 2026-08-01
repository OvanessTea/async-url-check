import type { ErrorRequestHandler } from "express";
import { AppError } from "./AppError";

export const errorHandler: ErrorRequestHandler = (
    error,
    _req,
    res,
    _next
) => {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            error: error.message
        });

        return;
    }

    console.log(error);

    res.status(500).json({
        error: 'Internal server error'
    })
}