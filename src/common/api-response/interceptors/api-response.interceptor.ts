import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { errorResponse, successResponse } from '../helpers/api-response.helper';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  private readonly _logger = new Logger(ApiResponseInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => successResponse(Array.isArray(data) ? data : [data])),

      catchError((error) => {
        this._logger.error(error);
        let [status, code, detail] = [
          500,
          'INTERNAL_SERVER_ERROR',
          'An unexpected error occured',
        ];

        if (error instanceof HttpException) {
          status = error.getStatus();
          const response = error.getResponse();

          if (typeof response === 'string') {
            detail = response;
          } else if (typeof response === 'object' && response !== null) {
            detail = response['message'] || detail;
            code = response['error'] || code;
          }
        }
        return of(errorResponse(code, detail, status));
      }),
    );
  }
}
