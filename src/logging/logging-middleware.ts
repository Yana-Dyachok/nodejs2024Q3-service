import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, body } = req;
    this.loggingService.log(
      `Request: ${method} ${url} | Query: ${JSON.stringify(
        query,
      )} | Body: ${JSON.stringify(body)}`,
    );
    res.on('finish', () => {
      const logMessage = `Response: ${method} ${url} | Status: ${res.statusCode}`;

      if (res.statusCode >= 400) {
        this.loggingService.error(logMessage);
      } else {
        this.loggingService.log(logMessage);
      }
    });
    next();
  }
}
