import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type DateFieldProps = FieldWrapperPassThroughProps & {
    registration: Partial<UseFormRegisterReturn>;
    label: string;
    style?: string;
    defaultValue?: Date;
};

// add a wrapper for error and validation
// integrate with TextField and call InputField
export const DateField = ({
    label,
    style,
    error,
    registration,
    defaultValue,
}: DateFieldProps) => {
    // validate depending on type
    return (
        <FieldWrapper label={label} error={error}>
            <input
                type="datetime-local"
                defaultValue={
                    defaultValue
                        ? new Date(defaultValue).toISOString().slice(0, 16)
                        : new Date().toISOString().slice(0, 16)
                }
                className={clsx(
                    'block h-11 w-full appearance-none rounded-md border border-hubba-800 bg-hubba-800 px-3 py-2 text-hubba-100 placeholder-gray-400 shadow-sm focus:border-hubba-500 focus:outline-none focus:ring-blue-500 sm:text-sm',
                    style,
                )}
                {...registration}
            />
        </FieldWrapper>
    );
};
