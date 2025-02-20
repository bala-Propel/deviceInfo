import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {

    private limiter = rateLimit({
        windowMs: 1 * 60 * 1000,
        max: 2,
        message: {
            error: 'Too Many Requests',
            message: 'Rate limit exceeded. Try again later.',
        },
        headers: true,
    });
    use(req: Request, res: Response, next: NextFunction) {
        return this.limiter(req, res, next);
    }
}
