import { Module } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';
import { auditLogProviders } from './audit-logs.providers';

@Module({
  providers: [...auditLogProviders, AuditLogsService],
  exports: [AuditLogsService],
})
export class AuditLogsModule {}
