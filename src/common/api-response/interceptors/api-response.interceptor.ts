import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ApiResponse } from '../interfaces/api-response.interface';
import { map, Observable } from 'rxjs';
import { successResponse } from '../helpers/api-response.helper';

@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next
      .handle()
      .pipe(
        map((data) => successResponse(Array.isArray(data) ? data : [data])),
      );
  }
}
