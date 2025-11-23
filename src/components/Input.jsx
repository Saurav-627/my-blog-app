import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      id,
      type = "text",
      value,
      onChange,
      placeholder,
      disabled = false,
      error,
      required = false,
      className = "",
      rows,
      ...props
    },
    ref
  ) => {
    const isTextarea = type === "textarea";
    const baseClasses = `w-full px-4 py-3 border ${
      error
        ? "border-red-300 focus:ring-red-500"
        : "border-slate-300 focus:ring-blue-500"
    } rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none ${
      isTextarea ? "resize-none" : ""
    } ${className}`;

    const InputElement = isTextarea ? "textarea" : "input";

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <InputElement
          ref={ref}
          id={id}
          type={isTextarea ? undefined : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={baseClasses}
          rows={isTextarea ? rows : undefined}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
