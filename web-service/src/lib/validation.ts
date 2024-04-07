import Joi from 'joi';

export const email = Joi.string()
    .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'org', 'edu', 'gov'] },
    })
    .required()
    .messages({
        'string.email': 'Invalid email address',
        'string.empty': 'Please enter your email address',
    });
export const username = Joi.string().min(3).max(30).required().messages({
    'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username cannot be more than 30 characters long',
    'string.empty': 'Please enter a username',
});
export const password = Joi.string()
    .min(8)
    .max(30)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
    .required()
    .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password cannot be more than 30 characters long',
        'string.pattern.base':
            'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        'string.empty': 'Please enter a password',
    });
export const confirmPassword = Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
        'any.only': 'Passwords do not match',
        'string.empty': 'Please confirm your password',
    });

export const name = Joi.string().min(3).max(30).required().messages({
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name cannot be more than 30 characters long',
    'string.empty': 'Please enter a name',
});

export const channel = Joi.string().min(3).max(30).allow('').messages({
    'string.min': 'Channel name must be at least 3 characters long',
    'string.max': 'Channel name cannot be more than 30 characters long',
});

export const desc = Joi.string().max(200).allow('').messages({
    'string.max': 'Bio cannot be more than 200 characters long',
    'string.empty': 'Please enter a bio',
});

