import { BaseContent } from '../models/BaseContent';

export type ContentOperations<T extends BaseContent> = {
create: (data: T) => T;
read: (id: string) => T | null;
update: (id: string, data: Partial<T>) => T;
delete: (id: string) => boolean;
};
