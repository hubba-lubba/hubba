import clsx from 'clsx';

type InputFieldProps = {
    type: 'text' | 'email' | 'password';
    label: string;
    required?: boolean;
    style?: string;
};
// add a wrapper for error and validation
export const TextField = ({
    type,
    label,
    required,
    style,
}: InputFieldProps) => {
    // validate depending on type
    return (
        <div>
            <label>
                {label}
                <input
                    type={type}
                    className={clsx('mb-3 w-48 hubba-900', style)}
                    required={required}
                />
            </label>
        </div>
    );
};
