import React from 'react'

type InputType = {
    name: string;
    type: string;
    required?: boolean;
    className?: string;
    value?: string
    placeholder?: string;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const FormInput = ({name, type, required, className, value, placeholder, onChange}: InputType) => {
  return (
        <div className="mt-2">
            <input
                name={name}
                type={type}
                required={required}
                className={className}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
  )
}

export default FormInput
