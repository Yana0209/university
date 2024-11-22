import { Versioned } from '../models/Versioned';
import { BaseContent } from '../models/BaseContent';

export function updateVersion<T extends BaseContent>(content: Versioned<T>, newContent: Partial<T>): Versioned<T> {
return {
    ...content,
    ...newContent,
    updatedAt: new Date(),
    version: content.version + 1,
    previousVersions: [...content.previousVersions, { ...content }],
};
}
