import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@nestjs/common';

export function validatePostbody(req: Request, res: Response, next: NextFunction) {
    if (req?.body?.url) {
        next();
    } else {
        res.status(HttpStatus.BAD_REQUEST).send({ message: "Invalid request" });
    }
}
