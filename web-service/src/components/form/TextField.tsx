import clsx from 'clsx';

type InputFieldProps = {
    type: 'text' | 'email' | 'password';
    label: string;
    required?: boolean;
    classNames?: string;
};
// add a wrapper for error and validation
export const TextField = ({
    type,
    label,
    required,
    classNames,
}: InputFieldProps) => {
    // validate depending on type
    return (
        <div>
            <label>
                {label}
                <input
                    type={type}
                    className={clsx('mb-3 w-48 hubba-900', classNames)}
                    required={required}
                />
            </label>
        </div>
    );
};
