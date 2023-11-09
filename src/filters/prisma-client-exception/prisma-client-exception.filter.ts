import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const message = exception.message.replace(/\n/g, ' ').trim();

    switch (exception.code) {
      case 'P2002': {
        const statusCode = HttpStatus.CONFLICT;
        super.catch(new HttpException(message, statusCode), host);
        break;
      }
      case 'P2003': {
        const statusCode = HttpStatus.CONFLICT;
        super.catch(new HttpException(message, statusCode), host);
        break;
      }

      default: {
        // default 500 error code
        super.catch(exception, host);
        break;
      }
    }
  }
}
