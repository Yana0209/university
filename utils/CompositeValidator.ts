import { Validator, ValidationResult } from '../operations/Validator';

export type CompositeValidator<T> = {
validators: Validator<T>[];
validateAll: (data: T) => ValidationResult;
};

export const createCompositeValidator = <T>(validators: Validator<T>[]): CompositeValidator<T> => {
return {
    validators,
    validateAll: (data) => {
    const errors: string[] = [];
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

