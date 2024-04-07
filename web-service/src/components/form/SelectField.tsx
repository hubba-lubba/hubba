import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
    options: string[];
    label: string;
    style?: string;
    registration: Partial<UseFormRegisterReturn>;
};

// add a wrapper for error and validation
export const SelectField = ({
    options,
    label,
    style,
    error,
    registration,
}: InputFieldProps) => {
    // validate depending on type
    return (
        <FieldWrapper label={label} error={error}>
            <select
                className={clsx(
                    'block h-11 w-full appearance-none rounded-md border border-hubba-800 bg-hubba-800 px-3 py-2 text-hubba-100 placeholder-gray-400 shadow-sm focus:border-hubba-500 focus:outline-none focus:ring-blue-500 sm:text-sm',
                    style,
                )}
                {...registration}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </FieldWrapper>
    );
};
