import { BaseContent } from '../models/BaseContent';

export type Role = 'admin' | 'editor' | 'viewer';

export type Permission = {
create: boolean;
read: boolean;
update: boolean;
delete: boolean;
};

export type AccessControl<T extends BaseContent> = {
role: Role;
permissions: Permission;
isAllowed: (role: Role, action: keyof Permission, content: T) => boolean;
};
