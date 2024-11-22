"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CompositeValidator_1 = require("./utils/CompositeValidator");
const Versioned_1 = require("./models/Versioned");
const article = {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'draft',
    title: 'TypeScript CMS',
    content: 'This is an article.',
    authorId: '123',
    tags: ['typescript', 'cms'],
};
const product = {
    id: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'published',
    name: 'Cool Product',
    description: 'A great product.',
    price: 99.99,
    category: 'gadgets',
    stock: 100,
};
const articleValidator = {
    validate: (data) => {
        const errors = [];
        if (!data.title)
            errors.push('Title is required.');
        if (data.content.length < 10)
            errors.push('Content must be at least 10 characters.');
        return { isValid: errors.length === 0, errors };
    },
};
const compositeValidator = (0, CompositeValidator_1.createCompositeValidator)([articleValidator]);
console.log(compositeValidator.validateAll(article));
const versionedArticle = Object.assign(Object.assign({}, article), { version: 1, previousVersions: [] });
const updatedArticle = (0, Versioned_1.updateVersion)(versionedArticle, { title: 'Updated Title' });
console.log(updatedArticle);
