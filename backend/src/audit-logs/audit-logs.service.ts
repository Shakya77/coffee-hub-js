import { Injectable, Inject } from '@nestjs/common';
import { AUDIT_LOG_REPOSITORY } from '../../constants';

@Injectable()
export class AuditLogsService {
  constructor(
    @Inject(AUDIT_LOG_REPOSITORY)
    private auditLogRepository: any,
  ) {}

  async log(auditData: {
    userId?: number;
    action: string;
    resource?: string;
    resourceId?: number;
    oldValue?: any;
    newValue?: any;
    ipAddress?: string;
    userAgent?: string;
    statusCode?: number;
    details?: string;
  }) {
    try {
      return await this.auditLogRepository.create(auditData);
    } catch (error) {
      console.error('Failed to create audit log:', error);
      // Don't throw - logging failures shouldn't break the app
    }
  }

  async logLogin(userId: number, ipAddress?: string, userAgent?: string) {
    return this.log({
      userId,
      action: 'LOGIN',
      ipAddress,
      userAgent,
    });
  }

  async logLogout(userId: number, ipAddress?: string) {
    return this.log({
      userId,
      action: 'LOGOUT',
      ipAddress,
    });
  }

  async logFailedLogin(email: string, ipAddress?: string, userAgent?: string) {
    return this.log({
      action: 'LOGIN_FAILED',
      details: `Failed login attempt for email: ${email}`,
      ipAddress,
      userAgent,
    });
  }

  async logRoleChange(
    userId: number,
    oldRole: string,
    newRole: string,
    ipAddress?: string,
  ) {
    return this.log({
      userId,
      action: 'ROLE_CHANGE',
      resource: 'User',
      resourceId: userId,
      oldValue: { role: oldRole },
      newValue: { role: newRole },
      details: `Role changed from ${oldRole} to ${newRole}`,
      ipAddress,
    });
  }

  async logUserAction(
    userId: number,
    action: string,
    resource: string,
    resourceId: number,
    oldValue?: any,
    newValue?: any,
    ipAddress?: string,
  ) {
    return this.log({
      userId,
      action,
      resource,
      resourceId,
      oldValue,
      newValue,
      ipAddress,
    });
  }

  async getAuditTrail(
    userId?: number,
    action?: string,
    limit: number = 100,
    offset: number = 0,
  ) {
    const where: any = {};
    if (userId) where.userId = userId;
    if (action) where.action = action;

    return await this.auditLogRepository.findAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          association: 'user',
          attributes: ['id', 'email', 'name'],
        },
      ],
    });
  }

  async getRecentActivity(hours: number = 24) {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    return await this.auditLogRepository.findAll({
      where: {
        createdAt: {
          [require('sequelize').Op.gte]: since,
        },
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          association: 'user',
          attributes: ['id', 'email', 'name'],
        },
      ],
    });
  }
}
