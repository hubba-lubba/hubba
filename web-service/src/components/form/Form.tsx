import React from 'react';

type FormProps = {
    children: React.ReactNode;
    title: string;
};

export const Form = ({ children, title }: FormProps) => {
    //validate
    return (
        <form action="">
            <h1>{title}</h1>
            {children}
        </form>
    );
};
