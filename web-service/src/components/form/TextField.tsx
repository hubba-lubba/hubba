import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
    type?: 'text' | 'email' | 'password' | 'url';
    registration: Partial<UseFormRegisterReturn>;
    label: string;
    style?: string;
    value?: string;
};

// add a wrapper for error and validation
export const TextField = ({
    type = 'text',
    label,
    style,
    error,
    registration,
    value,
}: InputFieldProps) => {
    // validate depending on type
    return (
        <FieldWrapper label={label} error={error}>
            <input
                value={value}
                type={type}
                className={clsx(
                    'block h-11 w-full appearance-none rounded-md border border-hubba-800 bg-hubba-800 px-3 py-2 text-hubba-100 placeholder-gray-400 shadow-sm focus:border-hubba-500 focus:outline-none focus:ring-blue-500 sm:text-sm',
                    style,
                )}
                {...registration}
            />
        </FieldWrapper>
    );
};
