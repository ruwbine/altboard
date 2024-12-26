import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ApiResponse } from '../interfaces/api-response.interface';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { errorResponse, successResponse } from '../helpers/api-response.helper';

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
        map((data) => successResponse(Array.isArray(data) ? data : [data])
      ),

      catchError((error) => {
        let [status, code, detail] = [500, 'INTERNAL_SERVER_ERROR', 'An unexpected error occured'];
        
        if(error instanceof HttpException){
          status = error.getStatus();
          const response = error.getResponse();
          console.log(response);

          if(typeof response === 'string'){
            detail = response;
          } else if(typeof response === 'object' && response !== null){
            detail = response['message'] || detail;
            code = response['error'] || code;

          }
        }
        return of(errorResponse(code, detail, status));
      }));

    
  }
}
