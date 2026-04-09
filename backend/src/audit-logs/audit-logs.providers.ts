import { AUDIT_LOG_REPOSITORY } from '../../constants';
import { AuditLog } from './entities/audit-log.entity';

export const auditLogProviders = [
  {
    provide: AUDIT_LOG_REPOSITORY,
    useValue: AuditLog,
  },
];
