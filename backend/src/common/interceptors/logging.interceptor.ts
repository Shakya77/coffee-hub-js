import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  Optional,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuditLogsService } from 'src/audit-logs/audit-logs.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Optional()
    private auditLogsService?: AuditLogsService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const startTime = Date.now();
    const { method, url, ip, headers } = request;
    const user = request.user || {};

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        const statusCode = response.statusCode;

        // Log to console (development)
        if (process.env.NODE_ENV === 'development') {
          console.log(
            `[${method}] ${url} - ${statusCode} - ${duration}ms - User: ${user?.id || 'anonymous'}`,
          );
        }

        // Log to audit system if available
        if (this.auditLogsService && user?.id) {
          // Only log significant endpoints (not health checks, etc)
          if (
            !url.includes('/health') &&
            !url.includes('/.') &&
            !url.includes('/public')
          ) {
            const action = this.getActionFromRoute(method, url);
            const resource = this.getResourceFromRoute(url);

            this.auditLogsService.logUserAction(
              user.id,
              action,
              resource,
              this.getResourceId(url) || 0,
              null,
              null,
              ip,
            );
          }
        }
      }),
      catchError((error) => {
        const duration = Date.now() - startTime;
        const statusCode = error.status || 500;

        if (process.env.NODE_ENV === 'development') {
          console.error(
            `[${method}] ${url} - ${statusCode} - ${duration}ms - Error: ${error.message}`,
          );
        }

        // Log failed requests to audit
        if (this.auditLogsService) {
          this.auditLogsService.log({
            userId: user?.id,
            action: 'REQUEST_ERROR',
            resource: this.getResourceFromRoute(url),
            statusCode,
            details: error.message,
            ipAddress: ip,
          });
        }

        throw error;
      }),
    );
  }

  private getActionFromRoute(method: string, url: string): string {
    const actions: Record<string, string> = {
      GET: 'READ',
      POST: 'CREATE',
      PATCH: 'UPDATE',
      PUT: 'UPDATE',
      DELETE: 'DELETE',
    };
    return actions[method] || method;
  }

  private getResourceFromRoute(url: string): string {
    const parts = url.split('/').filter((p) => p);
    return parts[parts.length - 1] || 'unknown';
  }

  private getResourceId(url: string): number | null {
    const match = url.match(/\/(\d+)(?:\?|$)/);
    return match ? parseInt(match[1]) : null;
  }
}
