import {
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Catch,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    if (error.getStatus() === HttpStatus.UNAUTHORIZED) {
      if (typeof error.response !== 'string') {
        error.response['message'] =
          error.response.message ||
          "You don't have permission to access this resource";
      }
    }

    if (error.response.message instanceof Array) {
      console.log(true);
      error.response.errors = { ...error.response.errors };
      error.response.errors.validationErrors = [...error.response.message];
      error.response.message = null;
      error.response.message = 'Validation Error';
    }

    res.status(error.getStatus()).json({
      statusCode: error.getStatus(),
      error: error.response.name || error.name,
      message: error.response.message || error.message,
      errors: error.response.errors || null,
      timestamp: new Date().toISOString(),
      path: req ? req.url : null,
      params: req && req.params ? req.params : null,
      query: req && req.query ? req.query : null,
      body: req && req.body ? req.body : null,
      files: req && req.files ? req.files : null,
    });
  }
}
