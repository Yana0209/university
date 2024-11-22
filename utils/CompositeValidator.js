"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompositeValidator = void 0;
const createCompositeValidator = (validators) => {
    return {
        validators,
        validateAll: (data) => {
            const errors = [];
            const isValid = validators.every((validator) => {
                const result = validator.validate(data);
                if (!result.isValid && result.errors) {
                    errors.push(...result.errors);
                }
                return result.isValid;
            });
            return { isValid, errors };
        },
    };
};
exports.createCompositeValidator = createCompositeValidator;
