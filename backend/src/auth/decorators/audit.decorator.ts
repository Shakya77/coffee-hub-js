import { SetMetadata } from '@nestjs/common';

export const AUDIT_KEY = 'audit';

export interface AuditConfig {
  action: string;
  resource?: string;
}

export const Audit = (action: string, resource?: string) =>
  SetMetadata(AUDIT_KEY, { action, resource } as AuditConfig);
