"use client";
import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";

interface formProps {
    label?: string;
    name: string;
    type?: any;
    placeholder?: string;
    as?: string;
    value?: any;
    children?: any
}
const inputCss =
    "peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100";
const labelCss = "after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.50] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"

//  -------- INPUT COMPONENT --------------------------------
const Input: React.FC<formProps> = ({ label, name, type, placeholder }) => {
    const { errors, touched } = useFormikContext();

    const hasError =
        (touched as Record<string, string>)[name] &&
        (errors as Record<string, string>)[name];
    return (
        <div className="relative h-8 w-full min-w-[200px]">
            <Field
                placeholder={placeholder}
                name={name}
                type={type ? type : "text"}

                className={`${inputCss}`}
            />
            <label className={`${labelCss}`}>
                {label}
            </label>
            {
                hasError && <div className="text-rose-600 absolute right-0 text-xs">
                    <ErrorMessage name={name} />
                </div>
            }
        </div>
    );
};
export const InputSelect: React.FC<formProps> = ({ label, name, type, placeholder, children }) => {

    return (
        <div className="relative h-12 w-full min-w-[200px]">
            <Field
                placeholder={placeholder}
                name={name}
                as="select"
                type={type ? type : "text"}

                className={`${inputCss}`}
            >
                {children}
            </Field>
            <label className={`${labelCss}`}>
                {label}
            </label>
        </div>

    );
};
export default Input;
