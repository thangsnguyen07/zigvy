import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'

import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse()
    const statusCode = response.statusCode

    return next.handle().pipe(
      map((data) => ({
        statusCode,
        message: statusCode >= 400 ? 'Error' : 'Success',
        error: statusCode >= 400 ? response.message : null,
        timestamp: Date.now(),
        data,
      })),
      catchError((err) => {
        if (err.status >= 400 && err.status < 500) {
          const isClassValidatorError =
            Array.isArray(err?.response?.message) &&
            typeof err?.response?.error === 'string' &&
            err.status === 400

          // Transforming class-validator errors to a different format
          if (isClassValidatorError) {
            err = new BadRequestException({
              statusCode: err.status,
              message: 'Validation error',
              error: err?.response?.error,
              subErrors: err?.response?.message,
            })
          }
        }

        return throwError(() => err)
      }),
    )
  }
}
