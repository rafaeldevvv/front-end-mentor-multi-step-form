import * as React from "react";
import { FC, useEffect, useRef } from "react";
import { IFormData, IInputChange, IError } from "../interfaces";
import Section from "./Section";

interface IFormTextFieldProps {
  label: string;
  placeholder: string;
  value: string;
  id: string;
  name: string;
  type?: "text" | "email" | "tel";
  required?: boolean;
  error?: IError;
  onChange: (event: IInputChange) => void;
}

const FormTextField: FC<IFormTextFieldProps> = ({
  label,
  placeholder,
  value,
  type = "text",
  id,
  name,
  required = false,
  onChange,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const errorInputName = error?.name;
  const errorMessage = error?.message;

  useEffect(() => {
    if (errorInputName && document.activeElement?.nodeName !== "INPUT") {
      inputRef.current!.focus();
    }
  }, [errorInputName, errorMessage]);

  let inputClassName = "text-form-field";
  if (error) inputClassName += " error";

  return (
    <div className="form-field-wrapper">
      <label htmlFor={id} className="text-form-field-label">
        {label}
        {error && (
          <>
            <p className="error">{error.message}</p>
          </>
        )}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        id={id}
        name={name}
        className={inputClassName}
        onChange={(e) => onChange({ name, value: e.target.value })}
        required={required}
        ref={inputRef}
      />
    </div>
  );
};

interface IFormStep1 {
  formData: IFormData;
  onChange: (event: IInputChange) => void;
  errors: IError[];
}

const FormStep1: FC<IFormStep1> = ({ formData, onChange, errors }) => {
  const { name, email, phoneNumber } = formData;

  const nameError = errors.find((e) => e.name === "name");
  const emailError = errors.find((e) => e.name === "email");
  const phoneNumberError = errors.find((e) => e.name === "phoneNumber");

  return (
    <Section
      heading="Personal info"
      description="Please provide your name, email address, and phone number."
    >
      <FormTextField
        label="Name"
        placeholder="e.g. Stephen King"
        value={name}
        onChange={onChange}
        name="name"
        id="name"
        required={true}
        error={nameError}
      />
      <FormTextField
        label="Email Address"
        placeholder="e.g. stephenking@lorem.com"
        value={email}
        onChange={onChange}
        name="email"
        id="email"
        type="email"
        required={true}
        error={emailError}
      />
      <FormTextField
        label="Phone Number"
        placeholder="e.g. +1 234 567 890"
        value={phoneNumber}
        onChange={onChange}
        name="phoneNumber"
        id="phone-number"
        type="tel"
        required={true}
        error={phoneNumberError}
      />
    </Section>
  );
};

export default FormStep1;
