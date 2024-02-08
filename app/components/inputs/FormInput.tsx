import React from 'react'

type InputType = {
    labelHtmlFor?: string;
    labelContent?: string;
    id?: string;
    name: string;
    type: string;
    autoComplete?: string
    required?: boolean;
    className?: string;
    value?: string
    placeholder?: string
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const FormInput = ({labelHtmlFor, labelContent, id, name, type, autoComplete, required, className, value, placeholder, onChange}: InputType) => {
  return (
    <div>
        <label htmlFor={labelHtmlFor} className="block text-sm font-medium leading-6 text-gray-900">
            {labelContent}
        </label>
        <div className="mt-2">
            <input
                id={id}
                name={name}
                type={type}
                autoComplete={autoComplete}
                required={required}
                className={className}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    </div>
  )
}

export default FormInput