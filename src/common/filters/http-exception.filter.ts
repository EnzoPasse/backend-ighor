import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { exists } from 'fs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = exception.getStatus();
    const message = exception.message.message[0].constraints ? exception.message.message[0].constraints : exception.message ;

    response.status(statusCode).json({
      statusCode,
      error: 'Fallo al ingresar los datos',
      path: request.url,
      message,
    });
  }
}
