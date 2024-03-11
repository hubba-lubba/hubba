import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
    type?: 'text' | 'email' | 'password';
    registration: Partial<UseFormRegisterReturn>;
    label: string;
    style?: string;
};

// add a wrapper for error and validation
export const TextField = ({
    type = 'text',
    label,
    style,
    error,
    registration,
}: InputFieldProps) => {
    // validate depending on type
    return (
        <FieldWrapper label={label} error={error}>
            <input
                type={type}
                className={clsx(
                    'sm:text-sm block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500',
                    style,
                )}
                {...registration}
            />
        </FieldWrapper>
    );
};
