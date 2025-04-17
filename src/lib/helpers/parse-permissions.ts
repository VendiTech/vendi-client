import { PermissionEnum } from '@/lib/generated/api';

export enum ParsedPermissions {
  Admin = 'Admin',
  User = 'User',
}

export const parsePermissions = (
  permissions: PermissionEnum[],
): ParsedPermissions[] => {
  if (permissions.includes(PermissionEnum.Any)) {
    return [ParsedPermissions.Admin];
  }

  return [ParsedPermissions.User];
};

export const parsePermissionsToEnum = (permissions: string[]): PermissionEnum[] => {
  if (permissions.includes(ParsedPermissions.Admin)) {
    return [PermissionEnum.Any];
  }

  return [PermissionEnum.Create, PermissionEnum.Read, PermissionEnum.Update, PermissionEnum.Delete];
}
