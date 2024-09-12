import {
  ExceptionFilter,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any) {
    const errorFormat = {
      error: null,
      message: null,
      statusCode: null,
    };

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    errorFormat.statusCode = status;

    if (!exception.response) {
      console.log('error is', exception.message);
      errorFormat.message = exception.message;
      errorFormat.error = exception.error;
    } else {
      console.log('error response is', exception.response);
      const data = exception.response;

      errorFormat.message = data.message ?? data;
      errorFormat.error = data.error;
    }

    // Instead of returning a response, we throw an error which GraphQL can format properly.
    throw new HttpException(errorFormat, status);
  }
}
