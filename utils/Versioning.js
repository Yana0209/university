"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVersion = updateVersion;
function updateVersion(content, newContent) {
    return Object.assign(Object.assign(Object.assign({}, content), newContent), { updatedAt: new Date(), version: content.version + 1, previousVersions: [...content.previousVersions, Object.assign({}, content)] });
}
