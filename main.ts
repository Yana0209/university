import { Article } from './models/Article';
import { Product } from './models/Product';
import { Validator } from './operations/Validator';
import { createCompositeValidator } from './utils/CompositeValidator';
import { Versioned, updateVersion } from './models/Versioned';

const article: Article = {
id: '1',
createdAt: new Date(),
updatedAt: new Date(),
status: 'draft',
title: 'TypeScript CMS',
content: 'This is an article.',
authorId: '123',
tags: ['typescript', 'cms'],
};

const product: Product = {
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

const articleValidator: Validator<Article> = {
validate: (data) => {
    const errors: string[] = [];
    if (!data.title) errors.push('Title is required.');
    if (data.content.length < 10) errors.push('Content must be at least 10 characters.');
    return { isValid: errors.length === 0, errors };
},
};

const compositeValidator = createCompositeValidator<Article>([articleValidator]);

console.log(compositeValidator.validateAll(article));

const versionedArticle: Versioned<Article> = {
...article,
version: 1,
previousVersions: [],
};

const updatedArticle = updateVersion(versionedArticle, { title: 'Updated Title' });
console.log(updatedArticle);
