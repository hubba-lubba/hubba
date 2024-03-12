import React from 'react';
import {
    useForm,
    UseFormReturn,
    SubmitHandler,
    UseFormProps,
    FieldValues,
} from 'react-hook-form';
import clsx from 'clsx';
import { AnySchema } from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

type FormProps<TFormValues extends FieldValues, Schema> = {
    style?: string;
    onSubmit: SubmitHandler<TFormValues>;
    children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
    options?: UseFormProps<TFormValues>;
    id?: string;
    schema?: Schema;
    title?: string;
};

export const Form = <
    TFormValues extends FieldValues = FieldValues,
    Schema extends AnySchema = AnySchema,
>({
    onSubmit,
    children,
    style,
    options,
    id,
    schema,
    title,
}: FormProps<TFormValues, Schema>) => {
    const methods = useForm<TFormValues>({
        ...options,
        resolver: schema && joiResolver(schema),
    });
    return (
        <form
            className={clsx('w-[300px] space-y-5', style)}
            onSubmit={methods.handleSubmit(onSubmit)}
            id={id}
        >
            <h1 className="text-3xl bold text-center font-semibold">{title}</h1>
            {children(methods)}
        </form>
    );
};
