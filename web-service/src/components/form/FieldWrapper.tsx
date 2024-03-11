import clsx from 'clsx';
import * as React from 'react';
import { FieldError } from 'react-hook-form';

type FieldWrapperProps = {
    label?: string;
    style?: string;
    children: React.ReactNode;
    error?: FieldError | undefined;
    description?: string;
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'children'>;

export const FieldWrapper = ({
    label,
    style,
    error,
    children,
}: FieldWrapperProps) => {
    return (
        <div>
            <label
                className={clsx(
                    'text-sm block font-medium text-hubba-100',
                    style,
                )}
            >
                {label}
                <div className="mt-1">{children}</div>
            </label>
            {error?.message && (
                <div
                    role="alert"
                    aria-label={error.message}
                    className="text-sm font-semibold text-red-500"
                >
                    {error.message}
                </div>
            )}
        </div>
    );
};
